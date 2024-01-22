package com.a407.back.dto;

import com.a407.back.domain.User.Gender;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MatchSearchRequest {
    // 사용자가 설정한 조건에 해당하는 필드
    private long majorCategoryId;
    private String genderStr;
    private String age;
    private String grade;
    private String scoreAverage;

    public void setMajorCategoryId(Long aLong) {
    }

    public void setGenderStr(Gender gender) {
    }

    public void setAge(String age) {
    }

    public void setGrade(String grade) {
    }

    public void setScoreAverage(String score) {
    }
}
