package com.a407.back.dto.User;

import com.a407.back.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserAccountRequest {

    private Long userId;
    private String account;


}
