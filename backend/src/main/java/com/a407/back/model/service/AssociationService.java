package com.a407.back.model.service;

import com.a407.back.dto.User.UserAssociationResponse;
import com.a407.back.dto.association.AssociationAdditionCodeResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.transaction.Transactional;
import java.security.NoSuchAlgorithmException;
import java.util.List;

public interface AssociationService {

    @Transactional
    void makeAssociation(Long userId);

    List<UserAssociationResponse> searchAssociationUserList(Long associationId);

    void deleteAssociation(Long userID);


    @Transactional
    AssociationAdditionCodeResponse makeAdditionCode(Long userId, String email, Long associationId)
        throws JsonProcessingException, NoSuchAlgorithmException;

    void changeAssociation(Long userId, String code);

    void changeAssociationRepresentative(Long representativeId, Long userId);
}
