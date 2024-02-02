package com.a407.back.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserAssociationResponse {

    private Long id;
    private String name;
    private String profileImage;
    private Boolean isRepresentative;

}
