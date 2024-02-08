package com.a407.back.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserChangeRequest {

    private String address;
    private Double latitude;
    private Double longitude;
    private String password;
    private String description;

}
