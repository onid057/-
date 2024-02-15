package com.a407.back.model.repo;

import com.a407.back.domain.Association;
import com.fasterxml.jackson.core.JsonProcessingException;

public interface AssociationRepository {

    Long makeAssociation(Association association);

    Long findAssociation(Long userId);

    void deleteAssociation(Long associationId);

    String findAdditionCode(String email) throws JsonProcessingException;

    Long findAssociationId(String code);

    void saveAssociationId(String code, String associationId);

    void saveCode(String email, String code);

    Long findTtl(String code);

    void changeAssociationRepresentative(Long userId, Long associationId);

    Long findAssociationRepresentative(Long associationId);

    Association getAssociationRepresentative(Long associationId);

    Association findAssociationByAssociationId(Long associationId);
}
