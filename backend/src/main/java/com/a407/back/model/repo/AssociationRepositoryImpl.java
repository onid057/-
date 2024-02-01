package com.a407.back.model.repo;

import com.a407.back.domain.Association;
import com.a407.back.domain.QAssociation;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.time.Duration;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class AssociationRepositoryImpl implements AssociationRepository {


    private final EntityManager em;
    private final JPAQueryFactory query;


    private final RedisTemplate<String, String> associationRedisTemplate;

    public AssociationRepositoryImpl(EntityManager em, JPAQueryFactory query,
        @Qualifier("associationRedisTemplate") RedisTemplate<String, String> associationRedisTemplate) {
        this.em = em;
        this.query = query;
        this.associationRedisTemplate = associationRedisTemplate;
    }


    @Override
    public Long makeAssociation(Association association) {
        em.persist(association);
        return association.getAssociationId();
    }

    @Override
    public Long findAssociation(Long userId) {
        QAssociation qAssociation = QAssociation.association;
        return query.select(qAssociation.associationId).from(qAssociation)
            .where(qAssociation.userId.eq(userId)).fetchOne();
    }

    @Override
    public void deleteAssociation(Long associationId) {
        QAssociation qAssociation = QAssociation.association;
        query.delete(qAssociation).where(qAssociation.associationId.eq(associationId)).execute();
    }

    @Override
    public String findAdditionCode(String email) {
        return associationRedisTemplate.opsForValue().get(email);
    }

    @Override
    public Long findAssociationId(String code) {
        String value = associationRedisTemplate.opsForValue().get(code);
        if (value == null) {
            return null;
        }
        return Long.valueOf(value);
    }

    @Override
    public void saveAssociationId(String code, String associationId) {
        associationRedisTemplate.opsForValue().set(code, associationId, Duration.ofMinutes(30));
    }

    @Override
    public void saveCode(String email, String code) {
        associationRedisTemplate.opsForValue().set(email, code, Duration.ofMinutes(30));
    }

    @Override
    public Long findTtl(String code) {
        return associationRedisTemplate.getExpire(code);
    }

    @Override
    public void changeAssociationRepresentative(Long userId, Long associationId) {
        QAssociation qAssociation = QAssociation.association;
        query.update(qAssociation).set(qAssociation.userId, userId)
            .where(qAssociation.associationId.eq(associationId)).execute();
    }

    @Override
    public Long findAssociationRepresentative(Long associationId) {
        QAssociation qAssociation = QAssociation.association;
        return query.select(qAssociation.userId).from(qAssociation)
            .where(qAssociation.associationId.eq(associationId))
            .fetchOne();
    }


}
