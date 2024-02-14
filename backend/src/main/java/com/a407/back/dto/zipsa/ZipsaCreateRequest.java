package com.a407.back.dto.zipsa;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ZipsaCreateRequest {

    private String description;
    private String account;
    private String preferTag;
    private List<Long> majorCategoryList;

}