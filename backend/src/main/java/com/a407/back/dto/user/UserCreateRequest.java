package com.a407.back.dto.user;

import com.a407.back.domain.User.Gender;
import java.sql.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserCreateRequest {

    private String email;
    private String password;
    private String name;
    private Date birth;
    private Gender gender;
    private String address;
    private Double latitude;
    private Double longitude;

}