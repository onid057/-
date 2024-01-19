package com.a407.back.dto;

import com.a407.back.domain.Association;
import com.a407.back.domain.User;
import com.a407.back.domain.User.Gender;
import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserRequest {

    private long userId;
    private Association associationId;
    private String email;
    private String password;
    private String name;
    private Timestamp birth;
    private Gender gender;
    private String address;
    private byte[] profileImage;
    private boolean isCertificated;
    private double latitude;
    private double longitude;
    private String account;
    private boolean isBlocked;
    private boolean isAdmin;
    private boolean isAffiliated;
    private int serviceCount;

    public User toEntity() {
        return User.builder()
            .userId(userId)
            .associationId(associationId)
            .email(email)
            .password(password)
            .name(name)
            .birth(birth)
            .gender(gender)
            .address(address)
            .profileImage(profileImage)
            .isCertificated(isCertificated)
            .latitude(latitude)
            .longitude(longitude)
            .account(account)
            .isBlocked(isBlocked)
            .isAdmin(isAdmin)
            .isAffiliated(isAffiliated)
            .serviceCount(serviceCount)
            .build();
    }
}
