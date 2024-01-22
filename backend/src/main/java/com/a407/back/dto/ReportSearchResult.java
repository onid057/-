package com.a407.back.dto;

import com.a407.back.config.ImageConfig;
import com.a407.back.domain.Report;
import java.io.IOException;
import java.net.URL;
import java.sql.Timestamp;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ReportSearchResult {

    private URL processImage;
    private String processContent;
    private Timestamp createdAt;


    @Builder
    public ReportSearchResult(byte[] processImage, String processContent, Timestamp createdAt)
        throws IOException {
        this.processImage = ImageConfig.toUrl(processImage);
        this.processContent = processContent;
        this.createdAt = createdAt;
    }

    public ReportSearchResult(Report report) throws IOException {
        this.processImage = ImageConfig.toUrl(report.getProcessImage());
        this.processContent = report.getProcessContent();
        this.createdAt = report.getCreatedAt();
    }

}
