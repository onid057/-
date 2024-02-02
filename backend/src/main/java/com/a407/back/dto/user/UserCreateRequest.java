package com.a407.back.dto.user;

import com.a407.back.domain.User;
import com.a407.back.domain.User.Gender;
import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserCreateRequest {

    private String email;
    private String password;
    private String name;
    private Timestamp birth;
    private Gender gender;
    private String address;
    private double latitude;
    private double longitude;
    private boolean isAdmin;
    private boolean isAffiliated;
    private boolean isBlocked;
    private boolean isCertificated;


    public User toEntity() {
        return User.builder()
            .email(email)
            .password(password)
            .name(name)
            .birth(birth)
            .gender(gender)
            .address(address)
            .latitude(latitude)
            .longitude(longitude)
            .build();
    }

}
