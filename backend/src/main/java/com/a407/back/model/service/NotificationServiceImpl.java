package com.a407.back.model.service;

import com.a407.back.domain.Notification;
import com.a407.back.domain.Room;
import com.a407.back.dto.UserNotificationResponse;
import com.a407.back.dto.ZipsaNotificationResponse;
import com.a407.back.model.repo.CategoryRepository;
import com.a407.back.model.repo.NotificationRepository;
import com.a407.back.model.repo.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    private final UserRepository userRepository;

    private final CategoryRepository categoryRepository;

    // 집사가 받는 알림의 세부조회
    @Override
    public ZipsaNotificationResponse getZipsaNotification(Notification notification) {
        String userName = userRepository.findByUserId(notification.getSendId()).getName();
        Room room = notification.getRoomId();
        String majorCategoryName = categoryRepository.findMajorCategoryName(
            room.getSubCategoryId().getMajorCategoryId().getMajorCategoryId());
        return new ZipsaNotificationResponse(userName, room.getExpectationStartedAt(),
            room.getExpectationEndedAt(),
            room.getExpectationPay(), majorCategoryName, room.getContent());
    }

    // 고객이 받는 알림의 세부조회
    @Override
    public UserNotificationResponse getUserNotification(Notification notification) {
        String zipsaName = userRepository.findByUserId(notification.getSendId()).getName();
        return new UserNotificationResponse(notification.getSendId(), zipsaName);
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
}
