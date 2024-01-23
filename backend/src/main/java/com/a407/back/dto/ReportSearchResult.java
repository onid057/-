package com.a407.back.dto;

import com.a407.back.domain.Report;
import java.sql.Timestamp;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ReportSearchResult {

    private String processImage;
    private String processContent;
    private Timestamp createdAt;


    @Builder
    public ReportSearchResult(byte[] processImage, String processContent, Timestamp createdAt) {
        this.processImage = new String(processImage);
        this.processContent = processContent;
        this.createdAt = createdAt;
    }

    public ReportSearchResult(Report report) {
        this.processImage = new String(report.getProcessImage());
        this.processContent = report.getProcessContent();
        this.createdAt = report.getCreatedAt();
    }

}
