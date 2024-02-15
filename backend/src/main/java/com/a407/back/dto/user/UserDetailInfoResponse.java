package com.a407.back.dto.user;

import java.sql.Date;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserDetailInfoResponse {

    private String profileImage;
    private String name;
    private Date birth;
    private String email;
    private String phoneNumber;
    private String address;

}
