package com.a407.back.dto.zipsa;

import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReportSearchResponse {

    private String processImage;
    private String processContent;
    private Timestamp createdAt;

}
