package com.a407.back.dto.User;

import com.a407.back.domain.User;
import java.util.Arrays;
import lombok.Getter;

@Getter
public class UserAssociationResponse {

    private final Long id;
    private final String name;
    private final String profileImage;
    private final Boolean isAdmin;

    public UserAssociationResponse(User user, boolean isAdmin) {
        this.id=user.getUserId();
        this.name = user.getName();
        if (user.getProfileImage() == null) {
            this.profileImage = null;
        } else {
            this.profileImage = Arrays.toString(user.getProfileImage());
        }
        this.isAdmin = isAdmin;
    }

}
