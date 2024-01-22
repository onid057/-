package com.a407.back.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MatchSearchRequest {

    // 사용자가 설정한 조건에 해당하는 필드
    private long majorCategoryId;
    private String genderStr;
    private String age;
    private String grade;
    private String scoreAverage;
}
