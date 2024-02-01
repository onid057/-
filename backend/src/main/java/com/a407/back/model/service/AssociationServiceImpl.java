package com.a407.back.model.service;

import com.a407.back.config.constants.ErrorCode;
import com.a407.back.domain.Association;
import com.a407.back.domain.User;
import com.a407.back.dto.user.UserAssociationResponse;
import com.a407.back.dto.association.AssociationAdditionCodeResponse;
import com.a407.back.exception.CustomException;
import com.a407.back.model.repo.AssociationRepository;
import com.a407.back.model.repo.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.transaction.Transactional;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.sql.Timestamp;
import java.time.Duration;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Objects;
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
        Association association = new Association(userId, new Timestamp(new Date().getTime()));

        User user = userRepository.findByUserId(userId);
        if (user == null || Boolean.TRUE.equals(user.getIsAffiliated())) {
            throw new CustomException(ErrorCode.BAD_REQUEST_ERROR);
        }

        Long associationId = associationRepository.makeAssociation(association);
        userRepository.makeAssociation(user.getUserId(), associationId);
    }

    @Override
    public List<UserAssociationResponse> getAssociationUserList(Long associationId) {
        List<User> users = userRepository.searchAssociationUserList(associationId);
        Long representativeId = associationRepository.findAssociationRepresentative(associationId);
        return users.stream()
            .map(user -> new UserAssociationResponse(user.getUserId(), user.getName(),
                user.getProfileImage() == null ? null : Arrays.toString(user.getProfileImage()),
                user.getUserId().equals(representativeId))).toList();
    }

    @Override
    @Transactional
    public void deleteAssociation(Long userId) {
        Long associationId = associationRepository.findAssociation(userId);

        if (associationId == null) {
            if (!userRepository.findIsAffiliated(userId)) {
                throw new CustomException(ErrorCode.BAD_REQUEST_ERROR);
            }
            userRepository.deleteAssociation(userId);
            return;
        }

        List<Long> userIdList = userRepository.searchAssociationUserIdList(associationId);
        for (Long id : userIdList) {
            userRepository.deleteAssociation(id);
        }
        associationRepository.deleteAssociation(associationId);
    }

    @Override
    @Transactional
    public AssociationAdditionCodeResponse makeAdditionCode(Long userId, String email,
        Long associationId) throws JsonProcessingException, NoSuchAlgorithmException {

        // 현재 사용자가 대표인지 여부를 확인 해야한다
        if (!Objects.equals(associationId, associationRepository.findAssociation(userId))) {
            throw new CustomException(ErrorCode.BAD_REQUEST_ERROR);
        }

        String code = associationRepository.findAdditionCode(email);
        // 이미 코드가 존재를 한다면 반환을 하고 종료
        if (code != null) {
            // 코드가 존재 한다면 남은 시간을 조회하도록 하자
            return new AssociationAdditionCodeResponse(code,
                associationRepository.findTtl(code).intValue());
        }

        int newCode = SecureRandom.getInstanceStrong().nextInt(10000000, 99999999);
        // 이제 생성한 코드가 중복이 되는지를 체크하고 아닐때 까지 반복을 시켜야 한다
        while (associationRepository.findAssociationId(String.valueOf(newCode)) != null) {
            newCode = SecureRandom.getInstanceStrong().nextInt(10000000, 99999999);
        }
        // 이제 코드와 연동 계정의 번호를 저장
        associationRepository.saveAssociationId(String.valueOf(newCode),
            String.valueOf(associationId));
        // 그리고 대표의 이메일과 코드를 저장
        associationRepository.saveCode(email, String.valueOf(newCode));
        return new AssociationAdditionCodeResponse(String.valueOf(newCode),
            (int) (Duration.ofMinutes(30).toMillis() / 1000));
    }

    @Override
    @Transactional
    public void changeAssociation(Long userId, String code) {
        User user = userRepository.findByUserId(userId);
        if (Boolean.TRUE.equals(user.getIsAffiliated())) {
            throw new CustomException(ErrorCode.BAD_REQUEST_ERROR);
        }
        Long associationId = associationRepository.findAssociationId(code);
        if (associationId == null) {
            throw new CustomException(ErrorCode.INVALID_PARAMETER);
        }
        userRepository.makeAssociation(userId, associationId);
    }


    @Override
    @Transactional
    public void changeAssociationRepresentative(Long representativeId, Long userId) {
        if (Objects.equals(representativeId, userId)) {
            throw new CustomException(ErrorCode.INVALID_PARAMETER);
        }
        User representative = userRepository.findByUserId(representativeId);
        User user = userRepository.findByUserId(userId);

        // 대표인지를 확인 하고 사용자 번호가 같은 연동 계정인지
        Long associationId = associationRepository.findAssociation(representativeId);
        if (associationId == null || !Objects.equals(
            representative.getAssociationId().getAssociationId(),
            user.getAssociationId().getAssociationId())) {
            throw new CustomException(ErrorCode.BAD_REQUEST_ERROR);
        }

        associationRepository.changeAssociationRepresentative(userId, associationId);
    }


}
