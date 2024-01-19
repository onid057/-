package com.a407.back.model.repo;

import com.a407.back.domain.QMajorCategory;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CategoryRepositoryImpl implements CategoryRepository {

    private final JPAQueryFactory query;

    private final EntityManager em;

    @Override
    public String findMajorCategoryName(Long majorId) {
        QMajorCategory qMajorCategory = QMajorCategory.majorCategory;
        return query.select(qMajorCategory.name).from(qMajorCategory)
            .where(qMajorCategory.majorCategoryId.eq(majorId)).fetchOne();
    }
}
