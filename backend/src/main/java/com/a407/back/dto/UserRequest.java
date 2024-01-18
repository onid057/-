package com.a407.back.dto;

import com.a407.back.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserRequest {

    private Long id;
    private String password;
    private String email;

    public User toEntity() {
        return User.builder()
            .id(id)
            .password(password)
            .email(email)
            .build();
    }
}
