package com.a407.back.domain;


import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "ZIPSA_CATEGORY")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class ZipsaCategory {

    @EmbeddedId
    private ZipsaCategoryId zipsaCategoryId;

    @Builder
    public ZipsaCategory(ZipsaCategoryId zipsaCategoryId) {
        this.zipsaCategoryId = zipsaCategoryId;
    }
}
