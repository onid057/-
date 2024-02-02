package com.a407.back.dto.room;

import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MakePublicRoomRequest {

    private Long userId;
    private Long subCategoryId;
    private String title;
    private String content;
    private String place;
    private int estimateDuration;
    private Timestamp roomCreatedAt;
    private Timestamp expectationStartedAt;
    private Timestamp expectationEndedAt;
    private int expectationPay;

}
