package com.a407.back.model.repo;

import com.a407.back.domain.Notification;
import com.a407.back.domain.Room;
import java.util.List;

public interface NotificationRepository {

    Notification findByNotificationId(Long notificationId);

    void changeNotificationStatusAcceptOrReject(Long notificationId, String status);

    void changeNotificationStatusClose(Room room);

    void makeNotification(Notification notification);

    List<Notification> findByRoomIdList(Room room);

    void deleteNotification(Notification notification);

}
