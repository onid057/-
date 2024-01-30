package com.a407.back.dto.User;

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