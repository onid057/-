package com.a407.back.dto.zipsa;

import com.a407.back.domain.Report;
import com.a407.back.domain.Room;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReportCreateRequest {

    private Long roomId;
    private String processImage;
    private String processContent;

    public Report toEntity(Room room) {
        return Report.builder().roomId(room).processImage(processImage)
            .processContent(processContent).build();
    }


}
