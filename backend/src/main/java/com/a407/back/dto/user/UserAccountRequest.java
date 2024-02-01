package com.a407.back.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserAccountRequest {

    private Long userId;
    private String account;

}
