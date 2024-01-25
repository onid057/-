package com.a407.back.dto;

import com.a407.back.domain.User;
import lombok.Getter;

@Getter
public class UserAccountRequest {

    private String account;

    public User toEntity() {
        return User.builder()
            .account(account)
            .build();
    }
}
