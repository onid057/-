package com.a407.back.dto.Notification;

import com.a407.back.domain.Notification.Status;
import com.a407.back.domain.Notification.Type;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class NotificationListResponse {

    private String name;
    private Type type;
    private Status status;
    private String majorCategory;
    private Long roomId;
    private Long notificationId;

}
