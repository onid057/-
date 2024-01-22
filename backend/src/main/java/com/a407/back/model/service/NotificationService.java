package com.a407.back.model.service;

import com.a407.back.domain.Notification;
import com.a407.back.domain.Room;
import com.a407.back.dto.UserNotificationResponse;
import com.a407.back.dto.ZipsaNotificationResponse;

public interface NotificationService {

    ZipsaNotificationResponse getZipsaNotification(Notification notification);

    UserNotificationResponse getUserNotification(Notification notification);

    Notification findByNotificationId(Long notificationId);

    void changeNotificationStatusAcceptOrReject(Long notificationId, String status);

    void changeNotificationStatusClose(Room room);
}
