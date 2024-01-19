package com.a407.back.model.repo;

import com.a407.back.domain.QRoom;
import com.a407.back.domain.Room;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
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
}
