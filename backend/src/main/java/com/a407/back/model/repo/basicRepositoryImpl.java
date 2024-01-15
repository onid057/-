package com.a407.back.model.repo;

import com.a407.back.domain.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class basicRepositoryImpl implements basicRepository{
    private final JPAQueryFactory query;

    private final EntityManager em;
    @Override
    public User save(User user) {
        em.persist(user);
        return user;
    }
}
