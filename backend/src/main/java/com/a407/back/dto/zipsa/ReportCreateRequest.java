package com.a407.back.dto.zipsa;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReportCreateRequest {

    private Long roomId;
    private String content;

}
