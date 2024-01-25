package com.a407.back.model.service;

import com.a407.back.domain.Notification;
import com.a407.back.domain.Room;
import java.util.Optional;

public interface NotificationService {

    Optional<?> getNotification(Long notificationId);

    Notification findByNotificationId(Long notificationId);

    void changeNotificationStatusAcceptOrReject(Long notificationId, String status);

    void changeNotificationStatusClose(Room room);

    int rejectNotification(Long notificationId);
}
