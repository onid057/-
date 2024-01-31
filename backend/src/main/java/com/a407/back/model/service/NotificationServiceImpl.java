package com.a407.back.model.service;

import com.a407.back.config.constants.ErrorCode;
import com.a407.back.domain.Notification;
import com.a407.back.domain.Notification.Type;
import com.a407.back.domain.Room;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.User.UserNotificationResponse;
import com.a407.back.dto.User.ZipsaNotificationResponse;
import com.a407.back.exception.CustomException;
import com.a407.back.model.repo.CategoryRepository;
import com.a407.back.model.repo.NotificationRepository;
import com.a407.back.model.repo.RoomRepository;
import com.a407.back.model.repo.UserRepository;
import com.a407.back.model.repo.ZipsaRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    private final UserRepository userRepository;

    private final CategoryRepository categoryRepository;

    private final RoomRepository roomRepository;

    private final ZipsaRepository zipsaRepository;

    // 고객이 자신의 알림 세부조회
    @Override
    public UserNotificationResponse findUserNotificationDetail(Long notificationId) {
        Notification notification = notificationRepository.findByNotificationId(notificationId);
        // 만약 집사라면 error
        if(!notification.getType().equals(Type.USER)) throw new CustomException(ErrorCode.BAD_REQUEST_ERROR);
        String zipsaName = userRepository.findByUserId(notification.getSendId()).getName();
        return new UserNotificationResponse(notification.getSendId(), zipsaName);
    }

    // 집사가 자신의 알림 세부조회
    @Override
    public ZipsaNotificationResponse findZipsaNotificationDetail(Long notificationId) {
        Notification notification = notificationRepository.findByNotificationId(notificationId);
        // 만약 고객이라면 error
        if(!notification.getType().equals(Type.ZIPSA)) throw new CustomException(ErrorCode.BAD_REQUEST_ERROR);
        String userName = userRepository.findByUserId(notification.getSendId()).getName();
        Room room = notification.getRoomId();
        String majorCategoryName = categoryRepository.findMajorCategoryName(
            room.getSubCategoryId().getMajorCategoryId().getMajorCategoryId());
        return new ZipsaNotificationResponse(userName, room.getExpectationStartedAt(),
            room.getExpectationEndedAt(),
            room.getExpectationPay(), majorCategoryName, room.getContent());
    }

    @Override
    public Notification findByNotificationId(Long notificationId) {
        return notificationRepository.findByNotificationId(notificationId);
    }

    @Override
    @Transactional
    public void changeNotificationStatusAcceptOrReject(Long notificationId, String status) {
        notificationRepository.changeNotificationStatusAcceptOrReject(notificationId, status);
    }

    @Override
    @Transactional
    public void changeNotificationStatusClose(Room room) {
        notificationRepository.changeNotificationStatusClose(room);
    }

    @Override
    @Transactional
    public int changeNotificationToReject(Long notificationId) {
        // 해당 알림을 reject
        notificationRepository.changeNotificationStatusAcceptOrReject(notificationId, "REJECT");

        // 방에서 알림 숫자를 줄임
        Notification notification = notificationRepository.findByNotificationId(notificationId);
        Room room = roomRepository.findByRoomId(notification.getRoomId().getRoomId());
        int newNotificationCount = roomRepository.changeNotificationCountDecrease(
            room.getNotificationCount(), notification.getRoomId().getRoomId());

        // 만약 알림 숫자를 줄였을 때 0이 된다면 방 broken으로 바꿈
        if (newNotificationCount == 0) {
            roomRepository.changeRoomStatus(notification.getRoomId().getRoomId(), "BROKEN");
        }
        return newNotificationCount;
    }

    @Override
    @Transactional
    public void changeRoomToMatch(Long notificationId) {
        Notification notification = notificationRepository.findByNotificationId(notificationId);
        // 수락한 알림은 accept
        notificationRepository.changeNotificationStatusAcceptOrReject(
            notificationId, "ACCEPT");
        // 다른 알림들이 있다면 close
        Room room = roomRepository.findByRoomId(notification.getRoomId().getRoomId());
        notificationRepository.changeNotificationStatusClose(room);
        // 후에 방 상태 변경
        roomRepository.changeRoomStatus(notification.getRoomId().getRoomId(), "BEFORE");
        // 집사 아이디 입력
        Zipsa zipsa = zipsaRepository.findByZipsaId(notification.getReceiveId());
        if (zipsa != null && zipsa.getIsWorked()) {
            zipsa = zipsaRepository.findByZipsaId(notification.getReceiveId());
        } else {
            zipsa = zipsaRepository.findByZipsaId(notification.getSendId());
        }
        roomRepository.changeRoomZipsa(zipsa, notification.getRoomId().getRoomId());
    }
}
