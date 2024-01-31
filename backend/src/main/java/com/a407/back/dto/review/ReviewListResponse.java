package com.a407.back.dto.review;

import java.sql.Timestamp;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReviewListResponse {

    private Long zipsaId;
    private Long reviewId;
    private String content;
    private int kindnessScore;
    private int skillScore;
    private int rewindScore;
    private Timestamp createdAt;

}