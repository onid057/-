package com.a407.back.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MatchSearchResponse {
    // 필요한 필드 정의
    private String name;
    private byte[] profileImage;
    private String gradeId;
    private List<String> categories; // 카테고리 정보(이름)를 리스트로 표현
    private int serviceCount;
    private String filteringCategoryId;

}
