package com.a407.back.model.repo;

import com.a407.back.domain.Association;
import com.a407.back.domain.QAssociation;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class AssociationRepositoryImpl implements AssociationRepository {


    private final EntityManager em;
    private final JPAQueryFactory query;


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


}
