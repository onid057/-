package com.a407.back.dto.Match;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public class MatchSearchRequest {

    private Long majorCategoryId;
    private String genderStr;
    private String age;
    private String grade;
    private String scoreAverage;

}
