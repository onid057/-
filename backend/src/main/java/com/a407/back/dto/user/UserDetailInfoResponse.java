package com.a407.back.dto.user;

import lombok.Builder;
import lombok.Getter;
import org.joda.time.DateTime;

@Getter
@Builder
public class UserDetailInfoResponse {

    private String profileImage;
    private String name;
    private DateTime birth;
    private String email;
    private String phoneNumber;
    private String address;

}
