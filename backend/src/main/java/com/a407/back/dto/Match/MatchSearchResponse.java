package com.a407.back.dto.Match;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MatchSearchResponse {

    private String name;
    private Byte[] profileImage;
    private String gradeName;
    private int gradeSalary;
    private int serviceCount;
    private String filteringCategoryId;
    // 카테고리 정보(이름)를 리스트로 표현
    private List<String> categories;

}
