package com.a407.back.model.repo;

import com.a407.back.domain.QRoom;
import com.a407.back.domain.QZipsa;
import com.a407.back.domain.QZipsaCategory;
import com.a407.back.domain.Room.Process;
import com.a407.back.domain.User.Gender;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.match.MatchSearchRequest;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.DateTimePath;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.joda.time.DateTime;
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
            return null;
        }
        try {
            Gender gender = Gender.valueOf(genderStr);
            return qZipsa.zipsaId.gender.eq(gender);
        } catch (IllegalArgumentException e) {
            return null;
        }
    }


    private BooleanExpression userBirthGoe(String age) {
        QZipsa qZipsa = QZipsa.zipsa;
        if (age == null || age.equalsIgnoreCase("All")) {
            return null;
        }

        try {
            int ageInt = Integer.parseInt(age);

            // 예: 40대 미만인 경우 50년 전
            DateTime lowerBound = DateTime.now().minusYears(ageInt + 10);
            // 예: 40대 이상인 경우 40년 전
            DateTime upperBound = DateTime.now().minusYears(ageInt);

            DateTimePath<DateTime> birthPath = qZipsa.zipsaId.birth;

            if (ageInt >= 40) {
                // 40대 이상인 경우
                return birthPath.loe(upperBound);
            } else {
                // 40대 미만인 경우
                return birthPath.gt(lowerBound);
            }
        } catch (NumberFormatException e) {
            return null;
        }
    }


    private BooleanExpression zipsaGradeIdEq(String grade) {
        if (grade == null || grade.equalsIgnoreCase("ALL")) {
            return null;
        } else {
            return QZipsa.zipsa.gradeId.name.eq(grade);
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
    public void changeMatchStartedAt(Long roomId) {
        QRoom qRoom = QRoom.room;
        query.update(qRoom).set(qRoom.startedAt, Timestamp.valueOf(LocalDateTime.now()))
            .where(qRoom.roomId.eq(roomId)).execute();
    }

    @Override
    public void changeMatchEndedAt(Long roomId) {
        QRoom qRoom = QRoom.room;
        query.update(qRoom).set(qRoom.endedAt, Timestamp.valueOf(LocalDateTime.now()))
            .where(qRoom.roomId.eq(roomId)).execute();
    }

    @Override
    public void changeMatchStatus(Long roomId, String status) {
        QRoom qRoom = QRoom.room;
        query.update(qRoom).set(qRoom.status, Process.valueOf(status))
            .where(qRoom.roomId.eq(roomId)).execute();
    }
}
