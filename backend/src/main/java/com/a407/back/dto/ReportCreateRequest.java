package com.a407.back.dto;

import com.a407.back.domain.Report;
import com.a407.back.domain.Room;
import java.io.IOException;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ReportCreateRequest {

    private Long roomId;
    private MultipartFile processImage;
    private String processContent;

    public Report toEntity(Room room) throws IOException {
        return Report.builder().roomId(room).processImage(processImage.getBytes())
            .processContent(processContent).build();
    }

}
