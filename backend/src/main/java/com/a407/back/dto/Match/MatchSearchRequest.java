package com.a407.back.dto.Match;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MatchSearchRequest {

    private long majorCategoryId;
    private String genderStr;
    private String age;
    private String grade;
    private String scoreAverage;

    public String getMajorCategory() {
        return String.valueOf(majorCategoryId);
    }

    @Override
    public String toString() {
        return "MatchSearchRequest{" +
            "majorCategoryId=" + majorCategoryId +
            ", genderStr='" + genderStr + '\'' +
            ", age='" + age + '\'' +
            ", grade='" + grade + '\'' +
            ", scoreAverage='" + scoreAverage + '\'' +
            '}';
    }

}
