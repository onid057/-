package com.a407.back.domain;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
@Getter
@Setter
public class ZipsaCategoryId {

    @ManyToOne
    @JoinColumn(name = "zipsa_id")
    private Zipsa zipsaId;

    @ManyToOne
    @JoinColumn(name = "major_category_id")
    private MajorCategory majorCategoryId;

}
