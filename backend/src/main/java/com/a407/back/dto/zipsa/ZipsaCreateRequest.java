package com.a407.back.dto.zipsa;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ZipsaCreateRequest {

    private Long userId;
    private Boolean isCertificated;
    private String description;
    private String account;
    private String preferTag;
    private List<String> categories;

}