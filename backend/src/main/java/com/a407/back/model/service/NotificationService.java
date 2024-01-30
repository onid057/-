package com.a407.back.model.service;

import com.a407.back.domain.Notification;
import com.a407.back.domain.Room;
import com.a407.back.dto.User.UserNotificationResponse;
import com.a407.back.dto.User.ZipsaNotificationResponse;

public interface NotificationService {

    UserNotificationResponse findUserNotificationDetail(Long notificationId);

    ZipsaNotificationResponse findZipsaNotificationDetail(Long notificationId);

    Notification findByNotificationId(Long notificationId);

    void changeNotificationStatusAcceptOrReject(Long notificationId, String status);

    void changeNotificationStatusClose(Room room);

    int rejectNotification(Long notificationId);

    void changeRoomToMatch(Long notificationId);
}
