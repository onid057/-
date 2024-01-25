package com.a407.back.model.repo;

import com.a407.back.domain.Notification;
import com.a407.back.domain.Room;

public interface NotificationRepository {

    Notification findByNotificationId(Long notificationId);

    void changeNotificationStatusAcceptOrReject(Long notificationId, String status);

    void changeNotificationStatusClose(Room room);

    void makeNotification(Notification notification);
}
