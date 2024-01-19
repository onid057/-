package com.a407.back.dto;

import java.sql.Timestamp;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ReportSearchResult {

    private byte[] processImage;
    private String processContent;
    private Timestamp createdAt;

    @Builder
    public ReportSearchResult(byte[] processImage, String processContent, Timestamp createdAt) {
        this.processImage = processImage;
        this.processContent = processContent;
        this.createdAt = createdAt;
    }

}
