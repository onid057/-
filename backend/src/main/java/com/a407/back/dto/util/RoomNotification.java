package com.a407.back.dto.util;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RoomNotification {

    private Long notificationId;
    private String zipsaName;
    private String gender;
    private String gradeName;
    private String preferTag;

}
