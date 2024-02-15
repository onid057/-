package com.a407.back.dto.notification;

import com.a407.back.domain.Notification.Status;
import com.a407.back.domain.Notification.Type;
import com.a407.back.domain.Room.Process;
import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class NotificationListResponse {

    private String name;
    private Type type;
    private Process process;
    private Status status;
    private String majorCategory;
    private Long roomId;
    private Long notificationId;
    private Timestamp createdAt;

}
