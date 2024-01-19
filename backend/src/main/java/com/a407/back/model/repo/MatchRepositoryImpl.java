package com.a407.back.model.repo;

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
                    (userBirth(condition.getAge())),
                    (zipsaGradeIdEq(condition.getGrade())),
                    (scoreAverageEq(condition.getScoreAverage())))
            .fetch();
    }

    private  BooleanExpression majorCategoryIdEq(Long categoryId){
        if(categoryId != null){
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


    private BooleanExpression userBirth(String age) {
        if (age == null || age.equalsIgnoreCase("All")) {
            return null; // 나이 필터링을 적용하지 않음
        } else {
            try {
                int ageInt = Integer.parseInt(age);
                Timestamp targetDate = Timestamp.valueOf(
                    LocalDate.now().minusYears(ageInt).atStartOfDay());
                return QUser.user.birth.goe(targetDate); // 입력된 나이 이상인 경우
            } catch (NumberFormatException e) {
                // 입력된 나이가 유효한 숫자가 아닌 경우
                return null;
            }
        }
    }


    private BooleanExpression zipsaGradeIdEq(String grade) {
        if (grade == null || grade.equalsIgnoreCase("ALL")) {
            return null;
        } else {
            return QZipsa.zipsa.gradeId.gradeId.goe(Long.parseLong(grade));
        }
    }

    private BooleanExpression scoreAverageEq(String score){
        if(score == null || score.equals("ALL")){
            if (QZipsa.zipsa.kindnessAverage == null || QZipsa.zipsa.skillAverage == null || QZipsa.zipsa.rewindAverage == null) {
                return null;
            }

        }
        return QZipsa.zipsa.kindnessAverage.add(QZipsa.zipsa.skillAverage).add(QZipsa.zipsa.rewindAverage).avg().goe(Double.valueOf(score));

    }

    @Override
    public Zipsa save(Zipsa zipsa) {
        em.persist(zipsa);
        return zipsa;
    }
}
