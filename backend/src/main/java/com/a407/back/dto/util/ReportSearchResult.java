package com.a407.back.dto.util;

import com.a407.back.domain.Report;
import java.sql.Timestamp;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ReportSearchResult {

    private String processImage;
    private String processContent;
    private Timestamp createdAt;

    public ReportSearchResult(Report report) {
        this.processImage = new String(report.getProcessImage());
        this.processContent = report.getProcessContent();
        this.createdAt = report.getCreatedAt();
    }

}
