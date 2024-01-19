package com.a407.back.model.service;

import com.a407.back.domain.Notification;
import com.a407.back.domain.Room;
import com.a407.back.dto.UserNotificationResponse;
import com.a407.back.dto.ZipsaNotificationResponse;
import com.a407.back.model.repo.CategoryRepository;
import com.a407.back.model.repo.NotificationRepository;
import com.a407.back.model.repo.RoomRepository;
import com.a407.back.model.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    private final UserRepository userRepository;

    private final RoomRepository roomRepository;

    private final CategoryRepository categoryRepository;

    @Override
    public ZipsaNotificationResponse getZipsaNotification(Notification notification) {
        String userName = userRepository.findByUserId(notification.getSendId()).getName();
        Room room = roomRepository.findByRoomId(notification.getRoomId().getRoomId());
        String majorCategoryName = categoryRepository.findMajorCategoryName(
            room.getSubCategoryId().getMajorCategoryId().getMajorCategoryId());
        return new ZipsaNotificationResponse(userName, room.getExpectationStartedAt(),
            room.getExpectationEndedAt(),
            room.getExpectationPay(), majorCategoryName, room.getContent());
    }

    @Override
    public UserNotificationResponse getUserNotification(Notification notification) {
        String zipsaName = userRepository.findByUserId(notification.getSendId()).getName();
        return new UserNotificationResponse(notification.getSendId(), zipsaName);
    }

    @Override
    public Notification findByNotificationId(Long notificationId) {
        return notificationRepository.findByNotificationId(notificationId);
    }
}
