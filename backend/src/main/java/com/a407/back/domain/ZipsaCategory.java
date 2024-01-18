package com.a407.back.domain;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    @Id
    @ManyToOne
    @JoinColumn(name = "zipsa_id")
    private Zipsa zipsaId;

    @Id
    @ManyToOne
    @JoinColumn(name = "major_category_id")
    private MajorCategory majorCategoryId;

    @Builder
    public ZipsaCategory(Zipsa zipsaId, MajorCategory majorCategoryId) {
        this.zipsaId = zipsaId;
        this.majorCategoryId = majorCategoryId;
    }
}
