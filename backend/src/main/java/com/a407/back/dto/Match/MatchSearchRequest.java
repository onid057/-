package com.a407.back.dto.Match;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MatchSearchRequest {

    // 사용자가 설정한 조건에 해당하는 필드
    private long majorCategoryId;
    private String genderStr;
    private String age;
    private String grade;
    private String scoreAverage;

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
