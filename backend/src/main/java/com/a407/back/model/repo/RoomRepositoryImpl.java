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
    public List<Room> findAll() {
        QRoom qRoom = QRoom.room;
        return query.selectFrom(qRoom).fetch();
    }
}
