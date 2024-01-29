package com.a407.back.model.repo;

import com.a407.back.domain.Association;

public interface AssociationRepository {

    Long makeAssociation(Association association);

    Long findAssociation(Long userId);

    void deleteAssociation(Long associationId);
}
