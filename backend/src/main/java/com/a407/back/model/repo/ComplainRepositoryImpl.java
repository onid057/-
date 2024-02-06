package com.a407.back.model.repo;

import com.a407.back.domain.Complain;
import com.a407.back.domain.QComplain;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ComplainRepositoryImpl implements ComplainRepository {

    private final EntityManager em;
    private final JPAQueryFactory query;

    @Override
    public void makeComplain(Complain complain) {
        em.persist(complain);
    }

    @Override
    public Complain findComplain(Long roomId) {
        QComplain qComplain = QComplain.complain;
        return query.selectFrom(qComplain).where(qComplain.roomId.roomId.eq(roomId)).fetchOne();
    }

}
