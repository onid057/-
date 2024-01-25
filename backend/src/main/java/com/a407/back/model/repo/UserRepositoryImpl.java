package com.a407.back.model.repo;

import com.a407.back.domain.Notification;
import com.a407.back.domain.Notification.Type;
import com.a407.back.domain.QNotification;
import com.a407.back.domain.QUser;
import com.a407.back.domain.QZipsa;
import com.a407.back.domain.User;
import com.a407.back.dto.UserNearZipsaResponse;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepository {

    private final JPAQueryFactory query;

    private final EntityManager em;


    @Override
    public User findByUserEmail(String email) {
        //하나만 반환->fetchOne
        //Entity Manager는 다른걸로 find해야함.
        QUser qUser = QUser.user;
        return query.select(qUser).from(qUser).where(qUser.email.eq(email)).fetchOne();
    }

    @Override
    public User save(User user) {
        em.persist(user);
        return user;
    }

    @Override
    public List<Notification> findNotificationByUserId(Long userId, String type) {
        QNotification qNotification = QNotification.notification;
        query.update(qNotification).set(qNotification.isRead, true)
            .where(qNotification.receiveId.eq(userId).and(qNotification.isRead.eq(false)))
            .execute();
        return query.selectFrom(qNotification).where(
            qNotification.receiveId.eq(userId)
                .and(qNotification.type.eq(
                    Type.valueOf(type)))).fetch();
    }

    @Override
    public User findByUserId(Long userId) {
        return em.find(User.class, userId);
    }


    @Override
    public UserNearZipsaResponse findNearZipsaList(Long userId) {
        QZipsa qZipsa = QZipsa.zipsa;
        User user = em.find(User.class, userId);
        return new UserNearZipsaResponse((query.selectFrom(qZipsa).where(qZipsa.isWorked.and(
            createLatitudeLongitudeBetween(qZipsa.zipsaId.latitude, qZipsa.zipsaId.longitude,
                user.getLatitude(), user.getLongitude(), 0.009)))).fetch());
    }


    public static BooleanExpression createLatitudeLongitudeBetween(NumberPath<Double> latitudePath,
        NumberPath<Double> longitudePath,
        double latitude, double longitude, double range) {
        return latitudePath.between(latitude - range, latitude + range)
            .and(longitudePath.between(longitude - range, longitude + range));
    }

    @Override
    public void saveAccount(Long userId, String account) {
        QUser qUser = QUser.user;
        query.update(qUser).set(qUser.account, account).where(qUser.userId.eq(userId)).execute();
    }

    @Override
    public void deleteAccount(User Id, String account) {
        QUser qUser = QUser.user;
        query.update(qUser).set(qUser.account, "").where(qUser.userId.eq(Id.getUserId())).execute();
    }

}
