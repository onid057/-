package com.a407.back.model.service;

import com.a407.back.domain.Notification;
import com.a407.back.domain.Room;
import com.a407.back.domain.Room.Process;
import com.a407.back.domain.SubCategory;
import com.a407.back.domain.User;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.Match.MatchCreateRequest;
import com.a407.back.dto.Room.MakePublicRoomRequest;
import com.a407.back.model.repo.CategoryRepository;
import com.a407.back.model.repo.NotificationRepository;
import com.a407.back.model.repo.RoomRepository;
import com.a407.back.model.repo.UserRepository;
import com.a407.back.model.repo.ZipsaRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;

    private final NotificationRepository notificationRepository;

    private final ZipsaRepository zipsaRepository;

    private final UserRepository userRepository;

    private final CategoryRepository categoryRepository;

    @Override
    public Room findByRoomId(Long roomId) {
        return roomRepository.findByRoomId(roomId);
    }

    @Override
    @Transactional
    public void changeRoomStatus(Long roomId, String status) {
        roomRepository.changeRoomStatus(roomId, status);
    }

    @Override
    @Transactional
    public int reduceNotificationCount(Long roomId) {
        Room room = roomRepository.findByRoomId(roomId);
        return roomRepository.reduceNotificationCount(room.getNotificationCount(), roomId);
    }

    @Override
    @Transactional
    public void changeRoomZipsa(Zipsa zipsa, Long roomId) {
        roomRepository.changeRoomZipsa(zipsa, roomId);
    }

    @Override
    @Transactional
    public void makeMatch(MatchCreateRequest matchCreateRequest) {
        // 수락한 알림은 accept
        notificationRepository.changeNotificationStatusAcceptOrReject(
            matchCreateRequest.getNotificationId(), "ACCEPT");
        // 다른 알림들이 있다면 close
        Room room = roomRepository.findByRoomId(matchCreateRequest.getRoomId());
        notificationRepository.changeNotificationStatusClose(room);
        // 후에 방 상태 변경
        roomRepository.changeRoomStatus(matchCreateRequest.getRoomId(), "BEFORE");
        // 집사 아이디 입력
        Notification notification = notificationRepository.findByNotificationId(
            matchCreateRequest.getNotificationId());
        Zipsa zipsa = zipsaRepository.findByZipsaId(notification.getReceiveId());
        if (zipsa != null && zipsa.getIsWorked()) {
            zipsa = zipsaRepository.findByZipsaId(notification.getReceiveId());
        } else {
            zipsa = zipsaRepository.findByZipsaId(notification.getSendId());
        }
        roomRepository.changeRoomZipsa(zipsa, matchCreateRequest.getRoomId());
    }

    @Override
    @Transactional
    public Long makePublicRoom(MakePublicRoomRequest makePublicRoomRequest) {
        User user = userRepository.findByUserId(makePublicRoomRequest.getUserId());
        SubCategory subCategory = categoryRepository.findBySubCategoryId(
            makePublicRoomRequest.getSubCategoryId());
        Room room = Room.builder().userId(user).subCategoryId(subCategory).title(
                makePublicRoomRequest.getTitle()).content(
                makePublicRoomRequest.getContent()).place(makePublicRoomRequest.getPlace()).isPublic(true)
            .roomCreatedAt(makePublicRoomRequest.getRoomCreatedAt())
            .estimateDuration(makePublicRoomRequest.getEstimateDuration())
            .expectationPay(makePublicRoomRequest.getExpectationPay())
            .expectationStartedAt(makePublicRoomRequest.getExpectationStartedAt())
            .expectationEndedAt(makePublicRoomRequest.getExpectationEndedAt()).isComplained(false)
            .isReviewed(false).isReported(false).status(Process.CREATE).build();
        return roomRepository.makeRoom(room);
    }

    @Override
    @Transactional
    public void deletePublicRoom(Long roomId) {
        Room room = roomRepository.findByRoomId(roomId);
        // 공개 방 삭제 전 연관된 알림들 삭제
        List<Notification> notificationList = notificationRepository.findByRoomIdList(room);
        for(Notification notification : notificationList) {
            notificationRepository.deleteNotification(notification);
        }
        // 공개 방 삭제
        roomRepository.deletePublicRoom(room);
    }
}
