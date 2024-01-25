package com.a407.back.dto.Zipsa;

import com.a407.back.domain.Report;
import com.a407.back.domain.Room;
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
        return Report.builder().roomId(room).processImage(processImage.getBytes())
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
