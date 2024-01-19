package com.a407.back.model.repo;

import com.a407.back.domain.QUser;
import com.a407.back.domain.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
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
}
