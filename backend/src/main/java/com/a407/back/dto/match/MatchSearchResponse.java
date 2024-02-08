package com.a407.back.dto.match;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MatchSearchResponse {

    private Long zipsaId;
    private String name;
    private String profileImage;
    private String gradeName;
    private int gradeSalary;
    private int serviceCount;
    private String filteringCategoryId;
    private Double scoreAverage;
    private String preferTag;

}
