package com.a407.back.dto.room;

import com.a407.back.dto.util.RoomNotification;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RoomNotificationListResponse {

    List<RoomNotification> roomNotificationList;

}
