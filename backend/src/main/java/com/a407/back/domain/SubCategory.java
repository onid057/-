package com.a407.back.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "SUB_CATEGORY")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class SubCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sub_category_id", updatable = false)
    private Long subCategoryId;

    @ManyToOne
    @JoinColumn(name = "major_category_id", nullable = false)
    private MajorCategory majorCategoryId;

    @Column(name = "name", nullable = false, length = 30)
    private String name;

    @Builder
    public SubCategory(MajorCategory majorCategoryId, String name) {
        this.majorCategoryId = majorCategoryId;
        this.name = name;
    }
}
