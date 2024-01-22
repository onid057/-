package com.a407.back.model.repo;

import com.a407.back.domain.QRoom;
import com.a407.back.domain.Room;
import com.a407.back.domain.Room.Process;
import com.a407.back.domain.Zipsa;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
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
    public void chageRoomStatus(Long roomId, String status) {
        QRoom qRoom = QRoom.room;
        query.update(qRoom).set(qRoom.status, Process.valueOf(status))
            .where(qRoom.roomId.eq(roomId)).execute();
    }

    @Override
    public int reduceNotificationCount(int count, Long roomId) {
        QRoom qRoom = QRoom.room;
        int newCount = count-1;
        query.update(qRoom).set(qRoom.notificationCount, newCount).where(qRoom.roomId.eq(roomId)).execute();
        return newCount;
    }

    @Override
    public void changeRoomZipsa(Zipsa zipsa, Long roomId) {
        QRoom qRoom = QRoom.room;
        query.update(qRoom).set(qRoom.zipsaId, zipsa).where(qRoom.roomId.eq(roomId)).execute();
    }
}
