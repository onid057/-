package com.a407.back.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class Tokens {

    private String accessToken;
    private String refreshToken;

}
