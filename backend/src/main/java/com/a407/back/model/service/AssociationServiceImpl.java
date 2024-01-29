package com.a407.back.model.service;

import com.a407.back.config.constants.ErrorCode;
import com.a407.back.domain.Association;
import com.a407.back.domain.User;
import com.a407.back.exception.CustomException;
import com.a407.back.model.repo.AssociationRepository;
import com.a407.back.model.repo.UserRepository;
import jakarta.transaction.Transactional;
import java.sql.Timestamp;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AssociationServiceImpl implements AssociationService {


    private final AssociationRepository associationRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void makeAssociation(Long userId) {
        Association association = new Association(userId,
            new Timestamp(new Date().getTime()));

        User user = userRepository.findByUserId(userId);
        if (user == null || user.getAssociationId().getAssociationId() != 0
            || user.getIsAffiliated().booleanValue()) {
            throw new CustomException(ErrorCode.BAD_REQUEST_ERROR);
        }

        Long associationId = associationRepository.makeAssociation(association);
        userRepository.makeAssociation(user.getUserId(), associationId);
    }


}
