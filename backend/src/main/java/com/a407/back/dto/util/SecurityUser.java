package com.a407.back.dto.util;

import com.a407.back.domain.Association;
import com.a407.back.domain.User;
import com.a407.back.domain.User.Gender;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;
import lombok.Getter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
@ToString
public class SecurityUser implements UserDetails {

    private final Long userId;
    private final Association associationId;
    private final String email;
    private final String password;
    private final String name;
    private final Timestamp birth;
    private final Gender gender;
    private final String address;
    private final String profileImage;
    private final Boolean isCertificated;
    private final Double latitude;
    private final Double longitude;
    private final String account;
    private final Boolean isBlocked;
    private final Boolean isAdmin;
    private final Boolean isAffiliated;
    private final int serviceCount;


    public SecurityUser(User user) {
        this.userId = user.getUserId();
        this.associationId = user.getAssociationId();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.name = user.getName();
        this.birth = user.getBirth();
        this.gender = user.getGender();
        this.address = user.getAddress();
        this.profileImage = user.getProfileImage();
        this.isCertificated = user.getIsCertificated();
        this.latitude = user.getLatitude();
        this.longitude = user.getLongitude();
        this.account = user.getAccount();
        this.isBlocked = user.getIsBlocked();
        this.isAdmin = user.getIsAdmin();
        this.isAffiliated = user.getIsAffiliated();
        this.serviceCount = user.getServiceCount();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (Boolean.TRUE.equals(isAdmin)) {
            return List.of(new SimpleGrantedAuthority("ADMIN"));
        } else {
            return List.of(new SimpleGrantedAuthority("USER"));
        }
    }

    @Override
    public String getUsername() {
        return this.getName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.getIsBlocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
