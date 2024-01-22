package com.a407.back.dto;

import com.a407.back.config.ImageConfig;
import com.a407.back.domain.Report;
import com.a407.back.domain.Room;
import java.io.IOException;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ReportCreateRequest {

    private Long roomId;
    private String processImage;
    private String processContent;


    public Report toEntity(Room room) {
        return Report.builder().roomId(room).processImage(ImageConfig.toByte(processImage))
            .processContent(processContent).build();
    }


    @Override
    public String toString() {
        return "ReportCreateRequest{" +
            "roomId=" + roomId +
            ", processImage='" + processImage + '\'' +
            ", processContent='" + processContent + '\'' +
            '}';
    }
}
