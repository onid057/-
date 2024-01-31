package com.a407.back.dto.util;

import java.sql.Timestamp;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ZipsaReview {

    private String userName;
    private String profileImage;
    private String content;
    private int kindnessScore;
    private int skillScore;
    private int rewindScore;
    private Timestamp createdAt;


}
