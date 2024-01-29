package com.a407.back.model.service;

import com.a407.back.dto.User.UserAssociationResponse;
import jakarta.transaction.Transactional;
import java.util.List;

public interface AssociationService {

    @Transactional
    void makeAssociation(Long userId);

    List<UserAssociationResponse> searchAssociationUserList(Long associationId);

    void deleteAssociation(Long userID);
}
