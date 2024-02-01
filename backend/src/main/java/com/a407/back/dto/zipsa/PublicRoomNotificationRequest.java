package com.a407.back.dto.zipsa;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PublicRoomNotificationRequest {

    private Long roomId;
    private Long zipsaId;

}
