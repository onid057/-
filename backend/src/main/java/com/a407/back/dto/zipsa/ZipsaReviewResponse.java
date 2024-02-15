package com.a407.back.dto.zipsa;

import java.sql.Timestamp;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ZipsaReviewResponse {

    private String userName;
    private String profileImage;
    private String content;
    private int kindnessScore;
    private int skillScore;
    private int rewindScore;
    private Timestamp createdAt;


}
