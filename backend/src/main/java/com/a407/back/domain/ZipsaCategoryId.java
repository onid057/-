package com.a407.back.domain;

import jakarta.persistence.Embeddable;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@EqualsAndHashCode
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
@Getter
public class ZipsaCategoryId {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "zipsa_id")
    private Zipsa zipsaId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "major_category_id")
    private MajorCategory majorCategoryId;

    @Builder
    public ZipsaCategoryId(Zipsa zipsa, MajorCategory majorCategory) {
        this.zipsaId = zipsa;
        this.majorCategoryId = majorCategory;
    }

}
