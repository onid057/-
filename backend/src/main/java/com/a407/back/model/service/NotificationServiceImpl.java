package com.a407.back.model.service;

import com.a407.back.domain.Notification;
import com.a407.back.domain.Room;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.User.UserNotificationResponse;
import com.a407.back.dto.User.ZipsaNotificationResponse;
import com.a407.back.model.repo.CategoryRepository;
import com.a407.back.model.repo.NotificationRepository;
import com.a407.back.model.repo.RoomRepository;
import com.a407.back.model.repo.UserRepository;
import com.a407.back.model.repo.ZipsaRepository;
import jakarta.transaction.Transactional;
import java.util.Optional;
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

    // 알림의 세부조회
    @Override
    public Optional<?> getNotification(Long notificationId) {
        Notification notification = notificationRepository.findByNotificationId(notificationId);

        Zipsa zipsa = zipsaRepository.findByZipsaId(notification.getReceiveId());
        if (zipsa != null && zipsa.getIsWorked()) {
            String userName = userRepository.findByUserId(notification.getSendId()).getName();
            Room room = notification.getRoomId();
            String majorCategoryName = categoryRepository.findMajorCategoryName(
                room.getSubCategoryId().getMajorCategoryId().getMajorCategoryId());
            ZipsaNotificationResponse zipsaNotificationResponse = new ZipsaNotificationResponse(
                userName, room.getExpectationStartedAt(),
                room.getExpectationEndedAt(),
                room.getExpectationPay(), majorCategoryName, room.getContent());
            return Optional.of(zipsaNotificationResponse);
        }
        String zipsaName = userRepository.findByUserId(notification.getSendId()).getName();
        return Optional.of(new UserNotificationResponse(notification.getSendId(), zipsaName));
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
    public int rejectNotification(Long notificationId) {
        // 해당 알림을 reject
        notificationRepository.changeNotificationStatusAcceptOrReject(notificationId, "reject");

        // 방에서 알림 숫자를 줄임
        Notification notification = notificationRepository.findByNotificationId(notificationId);
        Room room = roomRepository.findByRoomId(notification.getRoomId().getRoomId());
        int newNotificationCount = roomRepository.reduceNotificationCount(
            room.getNotificationCount(), notification.getRoomId().getRoomId());

        // 만약 알림 숫자를 줄였을 때 0이 된다면 방 broken으로 바꿈
        if (newNotificationCount == 0) {
            roomRepository.chageRoomStatus(notification.getRoomId().getRoomId(), "broken");
        }
        return newNotificationCount;
    }
}
