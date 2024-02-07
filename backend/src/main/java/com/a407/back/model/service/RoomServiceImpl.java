package com.a407.back.model.service;

import com.a407.back.domain.Notification;
import com.a407.back.domain.Room;
import com.a407.back.domain.Room.Process;
import com.a407.back.domain.SubCategory;
import com.a407.back.domain.User;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.room.MakePublicRoomRequest;
import com.a407.back.dto.room.PublicRoomDetailResponse;
import com.a407.back.dto.room.RoomNotificationListResponse;
import com.a407.back.dto.util.RoomNotification;
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

    private final UserRepository userRepository;

    private final CategoryRepository categoryRepository;

    private final ZipsaRepository zipsaRepository;

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
    public int changeNotificationCountDecrease(Long roomId) {
        Room room = roomRepository.findByRoomId(roomId);
        return roomRepository.changeNotificationCountDecrease(room.getNotificationCount(), roomId);
    }

    @Override
    @Transactional
    public void changeRoomZipsa(Zipsa zipsa, Long roomId) {
        roomRepository.changeRoomZipsa(zipsa, roomId);
    }

    @Override
    @Transactional
    public Long makePublicRoom(MakePublicRoomRequest makePublicRoomRequest) {
        User user = userRepository.findByUserId(makePublicRoomRequest.getUserId());
        SubCategory subCategory = categoryRepository.findBySubCategoryId(
            makePublicRoomRequest.getSubCategoryId());
        Room room = Room.builder().userId(user).subCategoryId(subCategory).title(
                makePublicRoomRequest.getTitle()).content(
                makePublicRoomRequest.getContent()).place(makePublicRoomRequest.getPlace())
            .isPublic(true)
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
        for (Notification notification : notificationList) {
            notificationRepository.deleteNotification(notification);
        }
        // 공개 방 삭제
        roomRepository.deletePublicRoom(room);
    }

    @Override
    public PublicRoomDetailResponse getPublicRoomDetail(Long roomId) {
        Room room = roomRepository.findByRoomId(roomId);
        return new PublicRoomDetailResponse(roomId, room.getTitle(), room.getContent(),
            room.getPlace(), room.getEstimateDuration(), room.getRoomCreatedAt(),
            room.getExpectationStartedAt(), room.getExpectationEndedAt(), room.getExpectationPay());
    }

    @Override
    public RoomNotificationListResponse getRoomNotificationList(Long roomId) {
        Room room = roomRepository.findByRoomId(roomId);
        List<RoomNotification> roomNotificationList =  notificationRepository.findByRoomIdList(room).stream().map(notification -> {
            Zipsa zipsa = zipsaRepository.findByZipsaId(notification.getSendId());
            User user = userRepository.findByUserId(zipsa.getZipsaId().getUserId());
            return new RoomNotification(notification.getNotificationId(),
                zipsa.getZipsaId().getName(), String.valueOf(user.getGender()),
                zipsa.getGradeId().getName(), zipsa.getPreferTag());
        }).toList();
        return new RoomNotificationListResponse(roomNotificationList);
    }
}
