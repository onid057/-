package com.a407.back.dto.zipsa;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ZipsaInfoResponse {

    private String name;
    private Long gradeId;
    private String gradeName;
    private Double kindnessAverage;
    private Double skillAverage;
    private Double rewindAverage;

}
