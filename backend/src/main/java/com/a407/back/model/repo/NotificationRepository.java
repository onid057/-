package com.a407.back.model.repo;

import com.a407.back.domain.Notification;

public interface NotificationRepository {
    Notification findByNotificationId(Long notificationId);
}
