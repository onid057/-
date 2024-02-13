package com.a407.back.model.service;

import com.a407.back.domain.Room;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.notification.NotificationListResponse;
import com.a407.back.model.repo.CategoryRepository;
import com.a407.back.model.repo.RoomRepository;
import com.a407.back.model.repo.SseRepository;
import com.a407.back.model.repo.UserRepository;
import com.a407.back.model.repo.ZipsaRepository;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
@RequiredArgsConstructor
public class SseServiceImpl implements SseService {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Value("${default.timeout}")
    private Long defaultTimeout;

    private final SseRepository sseRepository;

    private final UserRepository userRepository;

    private final ZipsaRepository zipsaRepository;

    private final RoomRepository roomRepository;

    private final CategoryRepository categoryRepository;

    // SseEmitter를 사용해서 알림을 보낼 때 사용
    @Transactional
    public void send(Long userId) {
        // 로그인 한 유저의 SseEmitter 가져오기
        SseEmitter sseEmitter = sseRepository.get(userId);
        if(sseEmitter != null) {
            Zipsa zipsa = zipsaRepository.findByZipsaId(userId);
            String type = zipsa != null && zipsa.getIsWorked() ? "ZIPSA" : "USER";
            List<NotificationListResponse> notificationList = userRepository.findNotificationByUserIdList(
                userId, type).stream().map(notification -> {
                Room room = roomRepository.findByRoomId(notification.getRoomId().getRoomId());
                return new NotificationListResponse(
                    userRepository.findByUserId(notification.getSendId()).getName(),
                    notification.getType(), room.getStatus(), notification.getStatus(),
                    categoryRepository.findMajorCategoryName(
                        notification.getRoomId().getSubCategoryId().getMajorCategoryId()
                            .getMajorCategoryId()),
                    notification.getRoomId().getRoomId(), notification.getNotificationId(),
                    notification.getCreatedAt());
            }).toList();

            sendToClient(sseEmitter, userId, notificationList);
            log.info("이벤트가 성공적으로 진행되었습니다. {}", userId);
        }
    }

    @Override
    @Transactional
    public SseEmitter connect(Long userId, HttpServletResponse response) {
        SseEmitter sseEmitter = sseRepository.save(userId, new SseEmitter(defaultTimeout));
        response.setHeader("X-Accel-Buffering", "no");
        // 시간 초과, 네트워크 오류를 포함한 모든 이유로 비동기 요청이 정상 동작할 수 없을 때 저장해둔 SseEmitter를 삭제함.
        sseEmitter.onCompletion(() -> sseRepository.delete(userId));
        sseEmitter.onTimeout(() -> sseRepository.delete(userId));
        sseEmitter.onError(e -> sseRepository.delete(userId));
        // 연결 요청에 의해 SseEmitter가 생성되면 더미 데이터를 보내줘야함.
        // 연결된 후 하나의 데이터도 전송되지 않는다면 SseEmitter의 유효시간이 끝났을 경우,
        // 503 응답이 발생하므로 연결시 바로 더미 데이터를 한 번 보내준다.
        sendToClient(sseEmitter, userId, "connect complete");
        return sseEmitter;
    }

    @Override
    @Transactional
    public void sendToClient(SseEmitter sseEmitter, Long userId, Object data) {
        try {
            sseEmitter.send(SseEmitter.event()
                .id(String.valueOf(userId))
                .name("sse")
                .data(data));
        } catch (IOException e) {
            sseRepository.delete(userId);
            log.error("SSE 연결 오류 발생", e);
        }
    }
}