package com.a407.back.model.repo;

import com.a407.back.domain.QMajorCategory;
import com.a407.back.domain.QSubCategory;
import com.a407.back.domain.SubCategory;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CategoryRepositoryImpl implements CategoryRepository {

    private final JPAQueryFactory query;

    @Override
    public String findMajorCategoryName(Long majorId) {
        QMajorCategory qMajorCategory = QMajorCategory.majorCategory;
        return query.select(qMajorCategory.name).from(qMajorCategory)
            .where(qMajorCategory.majorCategoryId.eq(majorId)).fetchOne();
    }

    @Override
    public SubCategory findBySubCategoryId(Long subCategoryId) {
        QSubCategory qSubCategory = QSubCategory.subCategory;
        return query.selectFrom(qSubCategory).where(qSubCategory.subCategoryId.eq(subCategoryId)).fetchOne();
    }
}
