package com.a407.back.model.repo;

import com.a407.back.domain.Grade;
import com.a407.back.domain.QGrade;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class GradeRepositoryImpl implements GradeRepository {

    private final JPAQueryFactory query;

    @Override
    public Grade findGradeById(Long gradeId) {
        QGrade qGrade = QGrade.grade;
        return query.select(qGrade).from(qGrade).where(qGrade.gradeId.eq(gradeId)).fetchOne();
    }

}
