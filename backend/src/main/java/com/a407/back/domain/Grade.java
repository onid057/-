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

@Table(name = "GRADE")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Grade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "grade_id", updatable = false)
    private Long gradeId;

    @Column(name = "name", nullable = false, length = 10)
    private String name;

    @Column(name = "salary", nullable = false)
    private int salary;


    @Builder
    public Grade(Long gradeId, String name, int salary) {
        this.gradeId = gradeId;
        this.name = name;
        this.salary = salary;
    }
}
