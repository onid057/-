package com.a407.back.model.repo;

import com.a407.back.domain.Zipsa;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ZipsaRepositoryImpl implements ZipsaRepository {

    private JPAQueryFactory query;

    private final EntityManager em;

    @Override
    public Zipsa findByZipsaId(Long zipsaId) {
        return em.find(Zipsa.class, zipsaId);
    }
}
