package com.a407.back.model.repo;

import com.a407.back.domain.Association;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class AssociationRepositoryImpl implements AssociationRepository{


    private final EntityManager em;
    private final JPAQueryFactory query;


    @Override
    public Long makeAssociation(Association association){
        em.persist(association);
        return association.getAssociationId();
    }





}
