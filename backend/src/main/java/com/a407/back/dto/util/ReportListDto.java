package com.a407.back.dto.util;

import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReportListDto {

    private String processImage;
    private String processContent;
    private Timestamp createdAt;

}
