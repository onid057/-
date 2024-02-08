package com.a407.back.model.repo;

import com.a407.back.domain.QRoom;
import com.a407.back.domain.Room;
import com.a407.back.domain.Room.Process;
import com.a407.back.domain.User;
import com.a407.back.domain.Zipsa;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class RoomRepositoryImpl implements RoomRepository {

    private final JPAQueryFactory query;

    private final EntityManager em;

    @Override
    public Room findByRoomId(Long roomId) {
        return em.find(Room.class, roomId);
    }

    @Override
    public void changeRoomStatus(Long roomId, String status) {
        QRoom qRoom = QRoom.room;
        query.update(qRoom).set(qRoom.status, Process.valueOf(status))
            .set(qRoom.matchCreatedAt, Timestamp.valueOf(
                LocalDateTime.now()))
            .where(qRoom.roomId.eq(roomId)).execute();
    }

    @Override
    public int changeNotificationCountDecrease(int count, Long roomId) {
        QRoom qRoom = QRoom.room;
        int newCount = count - 1;
        query.update(qRoom).set(qRoom.notificationCount, newCount).where(qRoom.roomId.eq(roomId))
            .execute();
        return newCount;
    }

    @Override
    public void changeNotificationCountIncrease(int count, Long roomId) {
        QRoom qRoom = QRoom.room;
        int newCount = count + 1;
        query.update(qRoom).set(qRoom.notificationCount, newCount).where(qRoom.roomId.eq(roomId))
            .execute();
    }

    @Override
    public void changeRoomZipsa(Zipsa zipsa, Long roomId) {
        QRoom qRoom = QRoom.room;
        query.update(qRoom).set(qRoom.zipsaId, zipsa).where(qRoom.roomId.eq(roomId)).execute();
    }

    @Override
    public void changeRoomReview(Long roomId) {
        QRoom qRoom = QRoom.room;
        query.update(qRoom).set(qRoom.isReviewed, true).where(qRoom.roomId.eq(roomId)).execute();
    }

    @Override
    public Long makeRoom(Room room) {
        em.persist(room);
        return room.getRoomId();
    }

    @Override
    public void deletePublicRoom(Room room) {
        em.remove(room);
    }

    @Override
    public void changeIsComplained(Long roomId) {
        QRoom qRoom = QRoom.room;
        query.update(qRoom).set(qRoom.isComplained, true).where(qRoom.roomId.eq(roomId)).execute();
    }

    @Override
    public QueryResults<Room> getPublicRoomList(int page, int size) {
        QRoom qRoom = QRoom.room;
        return query.selectFrom(qRoom).where(qRoom.isPublic.eq(true).and(qRoom.status.eq(Process.CREATE))).orderBy(qRoom.roomCreatedAt.desc())
            .offset(page).limit(size).fetchResults();
    }

    @Override
    public List<Room> getUserPublicRoomList(User user) {
        QRoom qRoom = QRoom.room;
        return query.selectFrom(qRoom).where(qRoom.userId.eq(user).and(qRoom.isPublic.eq(true)).and(qRoom.status.eq(Process.CREATE))).orderBy(qRoom.roomCreatedAt.asc()).fetch();
    }


}
