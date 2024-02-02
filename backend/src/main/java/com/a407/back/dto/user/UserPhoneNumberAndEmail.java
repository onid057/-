package com.a407.back.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserPhoneNumberAndEmail {

    private String email;
    private String phoneNumber;

}