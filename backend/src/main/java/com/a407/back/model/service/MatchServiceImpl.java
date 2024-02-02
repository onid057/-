package com.a407.back.model.service;

import com.a407.back.domain.Notification;
import com.a407.back.domain.Notification.Status;
import com.a407.back.domain.Notification.Type;
import com.a407.back.domain.Room;
import com.a407.back.domain.Room.Process;
import com.a407.back.domain.SubCategory;
import com.a407.back.domain.User;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.match.MatchSearchRequest;
import com.a407.back.dto.match.MatchSearchResponse;
import com.a407.back.dto.match.RoomCreateRequest;
import com.a407.back.model.repo.CategoryRepository;
import com.a407.back.model.repo.MatchRepository;
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
public class MatchServiceImpl implements MatchService {

    private final MatchRepository matchRepository;

    private final UserRepository userRepository;

    private final CategoryRepository categoryRepository;

    private final NotificationRepository notificationRepository;

    private final RoomRepository roomRepository;

    private final ZipsaRepository zipsaRepository;

    @Override
    @Transactional
    public List<MatchSearchResponse> getFilteredZipsaList(MatchSearchRequest matchSearchRequest) {
        List<Zipsa> zipsaList = matchRepository.findByConditions(matchSearchRequest);
        return zipsaList.stream().map(zipsa -> {
            List<String> categories = getCategoryNamesForZipsa(zipsa);
            String gradeName = zipsa.getGradeId().getName();
            int gradeSalary = zipsa.getGradeId().getSalary();
            double scoreAverage =
                (zipsa.getKindnessAverage() + zipsa.getRewindAverage() + zipsa.getSkillAverage())
                    / 3.0;
            return new MatchSearchResponse(
                zipsa.getZipsaId().getUserId(),
                zipsa.getZipsaId().getName(),
                zipsa.getZipsaId().getProfileImage(),
                gradeName,
                gradeSalary,
                zipsa.getServiceCount(),
                String.valueOf(matchSearchRequest.getMajorCategoryId()),
                scoreAverage,
                categories
            );
        }).toList();
    }

    @Override
    public List<String> getCategoryNamesForZipsa(Zipsa zipsa) {
        return matchRepository.findCategoryNamesByZipsaId(zipsa.getZipsaId().getUserId());
    }

    // 필터링 기반 방 만들기
    @Override
    @Transactional
    public Long makeFilterRoom(RoomCreateRequest roomCreateRequest) {
        // User 가져오기
        User user = userRepository.findByUserId(roomCreateRequest.getUserId());
        // SubCategory 가져오기
        SubCategory subCategory = categoryRepository.findBySubCategoryId(
            roomCreateRequest.getSubCategoryId());
        // 알림 개수만큼 방 만들기
        int notificationCount = roomCreateRequest.getHelperList().size();
        Room room = Room.builder().userId(user).subCategoryId(subCategory)
            .title(roomCreateRequest.getTitle())
            .content(roomCreateRequest.getContent())
            .place(roomCreateRequest.getPlace())
            .estimateDuration(roomCreateRequest.getEstimateDuration())
            .roomCreatedAt(roomCreateRequest.getRoomCreatedAt())
            .expectationStartedAt(roomCreateRequest.getExpectationStartedAt())
            .expectationEndedAt(roomCreateRequest.getExpectationEndedAt())
            .expectationPay(roomCreateRequest.getExpectationPay())
            .notificationCount(notificationCount).status(Process.CREATE).isComplained(false)
            .isPublic(false).isReviewed(false).isReported(false).build();
        Long newRoomId = roomRepository.makeRoom(room);
        Room newRoom = roomRepository.findByRoomId(newRoomId);
        // 방 아이디 가지고 알림 보내기
        for (Long id : roomCreateRequest.getHelperList()) {
            Notification notification = Notification.builder().roomId(newRoom)
                .sendId(roomCreateRequest.getUserId()).receiveId(id).type(
                    Type.ZIPSA).status(Status.STANDBY).isRead(false).build();
            notificationRepository.makeNotification(notification);
        }

        return newRoomId;
    }

    @Override
    @Transactional
    public Long changeMatchStartedAt(Long roomId) {
        matchRepository.changeMatchStartedAt(roomId);
        changeMatchStatus(roomId, "ONGOING");
        return roomId;
    }

    @Override
    @Transactional
    public Long changeMatchEndedAt(Long roomId) {
        matchRepository.changeMatchEndedAt(roomId);
        changeMatchStatus(roomId, "END");
        // 집사의 serviceCount + 1
        Room room = roomRepository.findByRoomId(roomId);
        Zipsa zipsa = zipsaRepository.findByZipsaId(room.getZipsaId().getZipsaId().getUserId());
        zipsaRepository.changeServiceCountIncrease(zipsa);
        return roomId;
    }

    @Override
    public void changeMatchStatus(Long roomId, String status) {
        matchRepository.changeMatchStatus(roomId, status);
    }
}
