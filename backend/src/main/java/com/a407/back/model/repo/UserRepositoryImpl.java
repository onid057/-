package com.a407.back.model.repo;

import com.a407.back.domain.Notification;
import com.a407.back.domain.Notification.Type;
import com.a407.back.domain.QNotification;
import com.a407.back.domain.QRoom;
import com.a407.back.domain.QUser;
import com.a407.back.domain.QZipsa;
import com.a407.back.domain.Room;
import com.a407.back.domain.Room.Process;
import com.a407.back.domain.User;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.user.UserChangeDto;
import com.a407.back.dto.user.UserPhoneNumberAndEmail;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.time.Duration;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepository {

    private final JPAQueryFactory query;

    private final EntityManager em;

    private final RedisTemplate<String, String> redisTemplate;

    @Value("${map.range}")
    private Double range;

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
    public List<Zipsa> findNearZipsaLocationList(Long userId) {
        QZipsa qZipsa = QZipsa.zipsa;
        User user = em.find(User.class, userId);
        return (query.selectFrom(qZipsa).where(qZipsa.isWorked.and(
            createLatitudeLongitudeBetween(qZipsa.zipsaId.latitude, qZipsa.zipsaId.longitude,
                user.getLatitude(), user.getLongitude(), range * 4)))).orderBy(
            qZipsa.serviceCount.desc()).fetch();
    }

    @Override
    public List<Zipsa> findNearZipsaInfoList(Double lat, Double lng) {
        QZipsa qZipsa = QZipsa.zipsa;
        return (query.selectFrom(qZipsa).where(qZipsa.isWorked.and(
            createLatitudeLongitudeBetween(qZipsa.zipsaId.latitude, qZipsa.zipsaId.longitude, lat,
                lng, range)))).orderBy(qZipsa.serviceCount.desc()).fetch();
    }

    @Override
    public List<Room> getUserRecordList(Long userId, Boolean isZipsa) {
        QRoom qRoom = QRoom.room;
        return query.selectFrom(qRoom)
            .where(isZipsa(userId, isZipsa).and(qRoom.status.eq(Process.END)))
            .orderBy(qRoom.endedAt.desc()).fetch();
    }

    @Override
    public Room getUserRecordInfo(Long roomId) {
        QRoom qRoom = QRoom.room;
        return query.selectFrom(qRoom)
            .where(qRoom.roomId.eq(roomId).and(qRoom.status.eq(Process.END)))
            .orderBy(qRoom.endedAt.desc()).limit(1).fetchOne();
    }

    @Override
    public Room getUserReservationInfo(Long roomId) {
        QRoom qRoom = QRoom.room;
        return query.selectFrom(qRoom).where(
                qRoom.roomId.eq(roomId).and(qRoom.status.in(Process.BEFORE, Process.ONGOING)))
            .orderBy(qRoom.expectationStartedAt.asc()).fetchOne();
    }

    @Override
    public List<Room> getUserReservationList(Long userId, Boolean isZipsa) {
        QRoom qRoom = QRoom.room;
        return query.selectFrom(qRoom).where(
                isZipsa(userId, isZipsa).and(qRoom.status.in(Process.BEFORE, Process.ONGOING)))
            .orderBy(qRoom.expectationStartedAt.asc()).fetch();
    }

    @Override
    public Room getUserReservationOngoing(Long userId, Boolean isZipsa) {
        QRoom qRoom = QRoom.room;
        return query.selectFrom(qRoom).where(
                isZipsa(userId, isZipsa).and(qRoom.status.in(Process.ONGOING)))
            .orderBy(qRoom.expectationStartedAt.asc()).limit(1).fetchOne();
    }

    @Override
    public Room getUserReservationBefore(Long userId, Boolean isZipsa) {
        QRoom qRoom = QRoom.room;
        return query.selectFrom(qRoom).where(
                isZipsa(userId, isZipsa).and(qRoom.status.in(Process.BEFORE)))
            .orderBy(qRoom.expectationStartedAt.asc()).limit(1).fetchOne();
    }

    private BooleanExpression isZipsa(Long userId, Boolean isZipsa) {
        QRoom qRoom = QRoom.room;
        if (Boolean.TRUE.equals(isZipsa)) {
            return qRoom.zipsaId.zipsaId.userId.eq(userId);
        } else {
            return qRoom.userId.userId.eq(userId);
        }
    }

    private BooleanExpression createLatitudeLongitudeBetween(NumberPath<Double> latitudePath,
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
    public List<User> searchAssociationUserList(Long associationId) {
        QUser qUser = QUser.user;
        return query.selectFrom(qUser).where(qUser.associationId.associationId.eq(associationId))
            .fetch();
    }

    @Override
    public void deleteAssociation(Long userId) {
        QUser qUser = QUser.user;
        query.update(qUser).set(qUser.associationId.associationId, (Long) null)
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
            query.select(qUser.isAffiliated).from(qUser).where(qUser.userId.eq(userId)).fetchOne());
    }


    @Override
    public void makePhoneNumber(String phoneNumber, String email) {
        QUser qUser = QUser.user;
        query.update(qUser).set(qUser.phoneNumber, phoneNumber).where(qUser.email.eq(email))
            .execute();
    }

    @Override
    public void makeSendMessage(UserPhoneNumberAndEmail userPhoneNumberAndEmail, String code)
        throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        String value = objectMapper.writeValueAsString(userPhoneNumberAndEmail);
        redisTemplate.opsForValue().set(code, value, Duration.ofMinutes(5));
    }

    @Override
    public UserPhoneNumberAndEmail findMessage(String code) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(redisTemplate.opsForValue().getAndDelete(code),
            UserPhoneNumberAndEmail.class);
    }

    @Override
    public String findCode(String code) {
        return redisTemplate.opsForValue().get(code);
    }

    @Override
    public void changeUserInfo(Long userId, UserChangeDto userUpdateDto) {
        QUser qUser = QUser.user;
        query.update(qUser).set(qUser.address, userUpdateDto.getAddress())
            .set(qUser.latitude, userUpdateDto.getLatitude())
            .set(qUser.longitude, userUpdateDto.getLongitude())
            .set(qUser.password, userUpdateDto.getPassword())
            .set(qUser.profileImage, userUpdateDto.getProfileImage())
            .where(qUser.userId.eq(userId))
            .execute();
    }

    @Override
    public void deleteUser(Long userId) {
        QUser qUser = QUser.user;
        query.delete(qUser).where(qUser.userId.eq(userId)).execute();
    }

    @Override
    public void changeUserCertificated(Long userId) {
        QUser qUser = QUser.user;
        query.update(qUser).set(qUser.isCertificated, true).where(qUser.userId.eq(userId))
            .execute();
    }

}
