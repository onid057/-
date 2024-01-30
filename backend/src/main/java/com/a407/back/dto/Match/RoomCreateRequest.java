package com.a407.back.dto.Match;

import java.sql.Timestamp;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class RoomCreateRequest {

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
    private List<Long> helperList;

}
