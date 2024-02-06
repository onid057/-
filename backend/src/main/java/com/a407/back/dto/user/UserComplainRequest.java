package com.a407.back.dto.user;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserComplainRequest {

    private Long roomId;
    private String content;

}
