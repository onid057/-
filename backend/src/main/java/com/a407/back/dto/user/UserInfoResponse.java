package com.a407.back.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserInfoResponse {

    private String name;
    private String profileImage;
    private Boolean isAffiliated;
    private Boolean isZipsa;

}