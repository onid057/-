package com.a407.back.model.repo;

import com.a407.back.domain.QMajorCategory;
import com.a407.back.domain.QZipsa;
import com.a407.back.domain.QZipsaCategory;
import com.a407.back.domain.QZipsaCategoryId;
import com.a407.back.domain.User.Gender;
import com.a407.back.domain.Zipsa;
import com.a407.back.domain.QUser;
import com.a407.back.dto.MatchSearchRequest;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MatchRepositoryImpl implements MatchRepository {

    private final JPAQueryFactory query;

    private final EntityManager em;

    @Override
    public List<Zipsa> findByConditions(MatchSearchRequest condition) {
        QZipsa qZipsa = QZipsa.zipsa;
        QUser qUser = QUser.user;
        QZipsaCategoryId qZipsaCategoryId = QZipsaCategoryId.zipsaCategoryId;
        return query.selectFrom(qZipsa)
            .leftJoin(qZipsa.zipsaId, qUser)
            .where(majorCategoryIdEq(condition.getMajorCategoryId()),
                (userGenderEq(condition.getGenderStr())),
                (userBirthGoe(condition.getAge())),
                (zipsaGradeIdEq(condition.getGrade())),
                (scoreAverageGoe(condition.getScoreAverage())))
            .fetch();
    }

    private BooleanExpression majorCategoryIdEq(Long categoryId) {
        if (categoryId != null) {
            return QZipsaCategoryId.zipsaCategoryId.majorCategoryId.majorCategoryId.eq(categoryId);
        }
        return null;
    }


    private BooleanExpression userGenderEq(String genderStr) {
        if (genderStr == null || genderStr.equalsIgnoreCase("ALL")) {
            return null; // 'ALL' 또는 null이 선택된 경우 성별 필터링을 적용하지 않음
        }

        try {
            Gender gender = Gender.valueOf(genderStr.toLowerCase());
            return QUser.user.gender.eq(gender); // 입력된 성별로 필터링
        } catch (IllegalArgumentException e) {
            return null; // 잘못된 성별 입력 처리
        }
    }


    private BooleanExpression userBirthGoe(String age) {
        if (age == null || age.equalsIgnoreCase("All")) {
            return null;
        }

        try {
            int ageInt = Integer.parseInt(age);
            Timestamp lowerBound = Timestamp.valueOf(
                LocalDate.now().minusYears(ageInt + 10).atStartOfDay()); // 예: 40대 미만인 경우 50년 전
            Timestamp upperBound = Timestamp.valueOf(
                LocalDate.now().minusYears(ageInt).atStartOfDay()); // 예: 40대 이상인 경우 40년 전

            if (ageInt >= 40) {
                // 40대 이상인 경우
                return QUser.user.birth.loe(upperBound);
            } else {
                // 40대 미만인 경우
                return QUser.user.birth.gt(lowerBound);
            }
        } catch (NumberFormatException e) {
            return null;
        }
    }


    private BooleanExpression zipsaGradeIdEq(String grade) {
        if (grade == null || grade.equalsIgnoreCase("ALL")) {
            return null;
        } else {
            return QZipsa.zipsa.gradeId.gradeId.goe(Long.parseLong(grade));
        }
    }

    private BooleanExpression scoreAverageGoe(String score) {
        if (score == null || score.equalsIgnoreCase("ALL")) {
            return null;
        }

        try {
            double scoreDouble = Double.parseDouble(score);
            return QZipsa.zipsa.kindnessAverage.coalesce(0.0)
                .add(QZipsa.zipsa.skillAverage.coalesce(0.0))
                .add(QZipsa.zipsa.rewindAverage.coalesce(0.0))
                .divide(3.0).goe(scoreDouble);
        } catch (NumberFormatException e) {
            return null;
        }
    }


    @Override
    public Zipsa save(Zipsa zipsa) {
        em.persist(zipsa);
        return zipsa;
    }

    @Override
    public List<String> findCategoryNamesByZipsaId(Long zipsaId) {
        QMajorCategory qMajorCategory = QMajorCategory.majorCategory;
        QZipsaCategory qZipsaCategory = QZipsaCategory.zipsaCategory;
        QZipsaCategoryId qZipsaCategoryId = QZipsaCategoryId.zipsaCategoryId;
        return query.select(qMajorCategory.name)
            .from(qMajorCategory)
            .join(qZipsaCategoryId.majorCategoryId,qMajorCategory)
            .where(qZipsaCategoryId.zipsaId.eq(qZipsaCategoryId.zipsaId))
            .fetch();
    }
}
