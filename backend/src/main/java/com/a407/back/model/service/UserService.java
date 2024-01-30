package com.a407.back.model.service;

import com.a407.back.domain.User;
import com.a407.back.dto.Notification.NotificationListResponse;
import com.a407.back.dto.User.UserAccountRequest;
import com.a407.back.dto.User.UserAccountResponse;
import com.a407.back.dto.User.UserNearZipsaResponse;
import com.a407.back.dto.User.UserPhoneNumberRequest;
import com.a407.back.dto.User.UserRecordsResponse;
import com.a407.back.dto.User.UserReservationResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

public interface UserService {

    Long save(User user);

    List<NotificationListResponse> findNotificationsByUserId(Long userId);

    boolean isWorkedDistinction(Long userId);

    UserNearZipsaResponse findNearZipsaList(Long userId);

    User findByUserId(Long userId);

    UserRecordsResponse findRecordsByUserId(Long userId);

    UserReservationResponse findReservationByUserId(Long userId);


    UserAccountResponse saveAccount(UserAccountRequest userAccountRequest);

    String getMaskedCardNumber(Long userId);

    void deleteAccount(Long userId);

    void sendMessage(UserPhoneNumberRequest userPhoneNumberRequest, String email)
        throws JsonProcessingException, NoSuchAlgorithmException;

    void savePhoneNumber(String code, String email) throws JsonProcessingException;
}
