package com.a407.back.dto.match;

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
    private Integer estimateDuration;
    private Timestamp roomCreatedAt;
    private Timestamp expectationStartedAt;
    private Timestamp expectationEndedAt;
    private Integer expectationPay;
    private List<Long> zipsaList;

}
