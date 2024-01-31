package com.a407.back.dto.util;

import com.a407.back.domain.User.Gender;
import com.a407.back.domain.Zipsa;
import lombok.Getter;

@Getter
public class UserNearZipsaList {

    private final String name;
    private final Gender gender;
    private final String gradeName;
    private final String description;
    private final String preferTag;
    private final Long zipsaId;

    public UserNearZipsaList(Zipsa zipsa) {
        this.name = zipsa.getZipsaId().getName();
        this.gender = zipsa.getZipsaId().getGender();
        this.gradeName = zipsa.getGradeId().getName();
        this.description = zipsa.getDescription();
        this.preferTag = zipsa.getPreferTag();
        this.zipsaId = zipsa.getZipsaId().getUserId();
    }


}
