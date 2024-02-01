package com.a407.back.dto.zipsa;

import java.sql.Timestamp;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ZipsaReservationResponse {

    private String name;
    private String profileImage;
    private String subCategoryName;
    private String majorCategoryName;
    private String content;
    private int estimateDuration;
    private Timestamp roomCreatedAt;
    private Timestamp matchCreatedAt;
    private Boolean isReported;
    private int reportCycle;
    private Boolean isPublic;
    private Timestamp startedAt;
    private Timestamp endedAt;
    private Timestamp expectationStartedAt;
    private Timestamp expectationEndedAt;
    private int expectationPay;

}
