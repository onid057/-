package com.a407.back.model.service;

import com.a407.back.domain.User;
import com.a407.back.dto.notification.NotificationListResponse;
import com.a407.back.dto.user.UserAccountRequest;
import com.a407.back.dto.user.UserAccountResponse;
import com.a407.back.dto.user.UserNearZipsaResponse;
import com.a407.back.dto.user.UserPhoneNumberRequest;
import com.a407.back.dto.user.UserRecordsResponse;
import com.a407.back.dto.user.UserReservationResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

public interface UserService {

    Long makeUser(User user);

    List<NotificationListResponse> findNotificationByUserIdList(Long userId);

    boolean isWorkedDistinction(Long userId);

    List<UserNearZipsaResponse> findNearZipsaList(Long userId);

    User findByUserId(Long userId);

    List<UserRecordsResponse> getUserRecordList(Long userId);

    List<UserReservationResponse> getUserReservationList(Long userId);


    UserAccountResponse makeAccount(UserAccountRequest userAccountRequest);

    String getMaskedCardNumber(Long userId);

    void deleteAccount(Long userId);

    void makeSendMessage(UserPhoneNumberRequest userPhoneNumberRequest, String email)
        throws JsonProcessingException, NoSuchAlgorithmException;

    void makePhoneNumber(String code, String email) throws JsonProcessingException;
}
