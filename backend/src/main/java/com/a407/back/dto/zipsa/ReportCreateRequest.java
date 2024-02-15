package com.a407.back.dto.zipsa;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReportCreateRequest {

    private Long roomId;
    private String content;

}
