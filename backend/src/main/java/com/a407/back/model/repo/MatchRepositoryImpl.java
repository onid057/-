package com.a407.back.model.repo;

import com.a407.back.domain.QZipsa;
import com.a407.back.domain.QZipsaCategory;
import com.a407.back.domain.Room;
import com.a407.back.domain.User.Gender;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.Match.MatchSearchRequest;
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
        return query.selectFrom(qZipsa).where(majorCategoryIdEq(condition.getMajorCategoryId()),
                (userGenderEq(condition.getGenderStr())), (userBirthGoe(condition.getAge())),
                (zipsaGradeIdEq(condition.getGrade())), (scoreAverageGoe(condition.getScoreAverage())))
            .fetch();
    }

    private BooleanExpression majorCategoryIdEq(Long categoryId) {
        QZipsaCategory qZipsaCategory = QZipsaCategory.zipsaCategory;
        QZipsa qZipsa = QZipsa.zipsa;
        if (categoryId != null) {
            return qZipsa.zipsaId.userId.in(
                query.select(qZipsaCategory.zipsaId.zipsaId.userId).from(qZipsaCategory)
                    .where(qZipsaCategory.majorCategoryId.majorCategoryId.eq(categoryId)).fetch());
        }
        return null;
    }


    private BooleanExpression userGenderEq(String genderStr) {
        QZipsa qZipsa = QZipsa.zipsa;
        if (genderStr == null || genderStr.equalsIgnoreCase("ALL")) {
            return null; // 'ALL' 또는 null이 선택된 경우 성별 필터링을 적용하지 않음
        }
        try {
            Gender gender = Gender.valueOf(genderStr.toLowerCase());
            return qZipsa.zipsaId.gender.eq(gender);
        } catch (IllegalArgumentException e) {
            return null; // 잘못된 성별 입력 처리
        }
    }


    private BooleanExpression userBirthGoe(String age) {
        QZipsa qZipsa = QZipsa.zipsa;
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
                return qZipsa.zipsaId.birth.loe(upperBound);
            } else {
                // 40대 미만인 경우
                return qZipsa.zipsaId.birth.gt(lowerBound);
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
                .add(QZipsa.zipsa.rewindAverage.coalesce(0.0)).divide(3.0).goe(scoreDouble);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    @Override
    public List<String> findCategoryNamesByZipsaId(Long zipsaId) {

        // 집사의 아이디를 기준으로 대분류 이름을 가져오는 함수

        QZipsaCategory qZipsaCategory = QZipsaCategory.zipsaCategory;

        return query.select(qZipsaCategory.majorCategoryId.name).from(qZipsaCategory)
            .where(qZipsaCategory.zipsaId.zipsaId.userId.eq(zipsaId)).fetch();
    }

    @Override
    public Room makeRoom (Room room) {
        em.persist(room);
        return room;
    }
}
