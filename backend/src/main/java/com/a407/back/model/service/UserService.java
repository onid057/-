package com.a407.back.model.service;

import com.a407.back.domain.User;
import com.a407.back.dto.notification.NotificationListResponse;
import com.a407.back.dto.room.PublicRoomListResponse;
import com.a407.back.dto.user.UserAccountRequest;
import com.a407.back.dto.user.UserAccountResponse;
import com.a407.back.dto.user.UserComplainRequest;
import com.a407.back.dto.user.UserCreateRequest;
import com.a407.back.dto.user.UserDetailInfoResponse;
import com.a407.back.dto.user.UserNearZipsaInfoResponse;
import com.a407.back.dto.user.UserNearZipsaLocationResponse;
import com.a407.back.dto.user.UserNearZipsaRequest;
import com.a407.back.dto.user.UserRecordsResponse;
import com.a407.back.dto.user.UserReservationResponse;
import com.a407.back.dto.user.UserUpdateRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

public interface UserService {

    Long makeUser(UserCreateRequest userCreateRequest);

    List<NotificationListResponse> findNotificationByUserIdList(Long userId);

    boolean isWorkedDistinction(Long userId);

    List<UserNearZipsaLocationResponse> findNearZipsaLocationList(Long userId);

    List<UserNearZipsaInfoResponse> findNearZipsaInfoList(
        UserNearZipsaRequest userNearZipsaRequest);

    User findByUserId(Long userId);

    List<UserRecordsResponse> getUserRecordList(Long userId);

    List<UserReservationResponse> getUserReservationList(Long userId);

    UserAccountResponse makeAccount(UserAccountRequest userAccountRequest);

    String getMaskedCardNumber(Long userId);

    void deleteAccount(Long userId);

    void makeSendMessage(String phoneNumber, String email)
        throws JsonProcessingException, NoSuchAlgorithmException;

    void makePhoneNumber(String code, String email) throws JsonProcessingException;

    void changeUserInfo(Long userId, UserUpdateRequest request);

    UserDetailInfoResponse findUserDetailInfo(Long userId);

    void deleteUser(Long userId);

    void makeComplain(UserComplainRequest userComplainRequest);

    PublicRoomListResponse getUserPublicRoomList(Long userId);
}
