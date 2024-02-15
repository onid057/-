package com.a407.back.model.repo;

import com.a407.back.domain.Grade;

public interface GradeRepository {

    Grade findGradeById(Long gradeId);

}