package com.a407.back.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "MAJOR_CATEGORY")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class MajorCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "major_category_id", updatable = false)
    private Long majorCategoryId;

    @Column(name = "name", nullable = false, length = 20)
    private String name;

    @Builder
    public MajorCategory(Long majorCategoryId, String name) {
        this.majorCategoryId = majorCategoryId;
        this.name = name;
    }
}
