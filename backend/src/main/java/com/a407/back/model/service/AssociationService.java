package com.a407.back.model.service;

import jakarta.transaction.Transactional;

public interface AssociationService {

    @Transactional
    void makeAssociation(Long userId);
}
