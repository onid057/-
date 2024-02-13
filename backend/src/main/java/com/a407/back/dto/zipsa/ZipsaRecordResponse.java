package com.a407.back.dto.zipsa;

import java.sql.Timestamp;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ZipsaRecordResponse {

    private Long roomId;
    private String name;
    private String subCategoryName;
    private String majorCategoryName;
    private String content;
    private Timestamp startedAt;
    private Timestamp endedAt;
    private Integer totalPay;
}
