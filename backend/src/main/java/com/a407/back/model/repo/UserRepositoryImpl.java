package com.a407.back.model.repo;

import com.a407.back.domain.Notification;
import com.a407.back.domain.Notification.Type;
import com.a407.back.domain.QAssociation;
import com.a407.back.domain.QNotification;
import com.a407.back.domain.QRoom;
import com.a407.back.domain.QUser;
import com.a407.back.domain.QZipsa;
import com.a407.back.domain.Room.Process;
import com.a407.back.domain.User;
import com.a407.back.dto.User.UserAssociationResponse;
import com.a407.back.dto.User.UserNearZipsaResponse;
import com.a407.back.dto.User.UserRecordsResponse;
import com.a407.back.dto.User.UserReservationResponse;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.Objects;
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
    public User makeUser(User user) {
        em.persist(user);
        return user;
    }

    @Override
    public List<Notification> findNotificationByUserIdList(Long userId, String type) {
        QNotification qNotification = QNotification.notification;
        query.update(qNotification).set(qNotification.isRead, true)
            .where(qNotification.receiveId.eq(userId).and(qNotification.isRead.eq(false)))
            .execute();
        return query.selectFrom(qNotification).where(
                qNotification.receiveId.eq(userId).and(qNotification.type.eq(Type.valueOf(type))))
            .orderBy(qNotification.createdAt.desc()).fetch();
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
                user.getLatitude(), user.getLongitude(), 0.009)))).orderBy(
            qZipsa.serviceCount.desc()).fetch());
    }

    @Override
    public UserRecordsResponse getUserRecordList(Long userId) {
        QRoom qRoom = QRoom.room;
        return new UserRecordsResponse(
            query.selectFrom(qRoom).where(qRoom.userId.userId.eq(userId).and(qRoom.status.eq(
                Process.END))).orderBy(qRoom.expectationStartedAt.asc()).fetch());
    }

    @Override
    public UserReservationResponse getUserReservationList(Long userId) {
        QRoom qRoom = QRoom.room;
        return new UserReservationResponse(query.selectFrom(qRoom).where(
                qRoom.userId.userId.eq(userId).and(qRoom.status.in(Process.BEFORE, Process.ONGOING)))
            .orderBy(qRoom.expectationStartedAt.asc()).fetch());
    }


    public static BooleanExpression createLatitudeLongitudeBetween(NumberPath<Double> latitudePath,
        NumberPath<Double> longitudePath, double latitude, double longitude, double range) {
        return latitudePath.between(latitude - range, latitude + range)
            .and(longitudePath.between(longitude - range, longitude + range));
    }

    @Override
    public void makeAccount(Long userId, String account) {
        QUser qUser = QUser.user;
        query.update(qUser).set(qUser.account, account).where(qUser.userId.eq(userId)).execute();
    }

    @Override
    public void deleteAccount(User user, String account) {
        QUser qUser = QUser.user;
        query.update(qUser).set(qUser.account, "").where(qUser.userId.eq(user.getUserId()))
            .execute();
    }

    @Override
    public void makeAssociation(Long userId, Long associationId) {
        QUser qUser = QUser.user;
        query.update(qUser).set(qUser.associationId.associationId, associationId)
            .set(qUser.isAffiliated, true).where(qUser.userId.eq(userId)).execute();
    }


    @Override
    public List<UserAssociationResponse> getAssociationUserList(Long associationId) {
        QUser qUser = QUser.user;
        QAssociation qAssociation = QAssociation.association;
        Long adminId = Objects.requireNonNull(query.selectFrom(qAssociation)
            .where(qAssociation.associationId.eq(associationId)).fetchOne()).getUserId();
        return query.selectFrom(qUser)
            .where(qUser.associationId.associationId.eq(associationId)).fetch().stream()
            .map(user -> new UserAssociationResponse(user,
                Objects.equals(user.getUserId(), adminId))).toList();
    }


    @Override
    public void deleteAssociation(Long userId) {
        QUser qUser = QUser.user;
        query.update(qUser).set(qUser.associationId.associationId, 0L)
            .set(qUser.isAffiliated, false).where(qUser.userId.eq(userId)).execute();
    }

    @Override
    public List<Long> searchAssociationUserIdList(Long associationId) {
        QUser qUser = QUser.user;
        return query.select(qUser.userId).from(qUser)
            .where(qUser.associationId.associationId.eq(associationId)).fetch();
    }

    @Override
    public boolean findIsAffiliated(Long userId) {
        QUser qUser = QUser.user;
        return Objects.requireNonNull(
            query.select(qUser.isAffiliated).from(qUser).where(qUser.userId.eq(userId))
                .fetchOne()).booleanValue();
    }


    @Override
    public void makePhoneNumber(String phoneNumber, String email) {
        QUser qUser = QUser.user;
        query.update(qUser).set(qUser.phoneNumber, phoneNumber).set(qUser.isCertificated, true)
            .where(qUser.email.eq(email)).execute();
    }

}
