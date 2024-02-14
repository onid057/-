package com.a407.back.model.service;

import com.a407.back.dto.user.UserAssociationResponse;
import com.a407.back.dto.association.AssociationAdditionCodeResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

public interface AssociationService {

    void makeAssociation(Long userId);

    List<UserAssociationResponse> getAssociationUserList(Long associationId);

    void deleteAssociation(Long userID);

    AssociationAdditionCodeResponse makeAdditionCode(Long userId, String email, Long associationId)
        throws JsonProcessingException, NoSuchAlgorithmException;

    void changeAssociation(Long userId, String code);

    void changeAssociationRepresentative(Long representativeId, Long userId);

}
