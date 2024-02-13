package com.a407.back.model.service;

import com.a407.back.domain.User;
import com.a407.back.dto.board.BoardListResponse;
import com.a407.back.dto.notification.NotificationListResponse;
import com.a407.back.dto.room.UserPublicRoomListResponse;
import com.a407.back.dto.user.UserAccountRequest;
import com.a407.back.dto.user.UserAccountResponse;
import com.a407.back.dto.user.UserChangeRequest;
import com.a407.back.dto.user.UserComplainRequest;
import com.a407.back.dto.user.UserCreateRequest;
import com.a407.back.dto.user.UserDetailInfoResponse;
import com.a407.back.dto.user.UserInfoResponse;
import com.a407.back.dto.user.UserNearZipsaInfoResponse;
import com.a407.back.dto.user.UserNearZipsaLocationResponse;
import com.a407.back.dto.user.UserNearZipsaRequest;
import com.a407.back.dto.user.UserRecordResponse;
import com.a407.back.dto.user.UserRecordInfoResponse;
import com.a407.back.dto.user.UserReservationInfoResponse;
import com.a407.back.dto.user.UserReservationResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    Long makeUser(UserCreateRequest userCreateRequest);

    List<NotificationListResponse> findNotificationByUserIdList(Long userId);

    boolean isWorkedDistinction(Long userId);

    List<UserNearZipsaLocationResponse> findNearZipsaLocationList(Long userId);

    List<UserNearZipsaInfoResponse> findNearZipsaInfoList(
        UserNearZipsaRequest userNearZipsaRequest);

    User findByUserId(Long userId);

    UserRecordInfoResponse getUserRecordInfo(Long roomId);

    List<UserRecordResponse> getUserRecordList(Long userId);

    UserReservationInfoResponse getUserReservationInfo(Long roomId);

    List<UserReservationResponse> getUserReservationList(Long userId);

    UserAccountResponse makeAccount(Long userId, UserAccountRequest userAccountRequest);
    UserReservationResponse getUserReservationFirst(Long userId);

    String getMaskedCardNumber(Long userId);

    void deleteAccount(Long userId);

    void makeSendMessage(String phoneNumber, String email)
        throws JsonProcessingException, NoSuchAlgorithmException;

    void makePhoneNumber(String code, String email) throws JsonProcessingException;

    void changeUserCertificated(Long userId);

    void changeUserInfo(Long userId, UserChangeRequest request, MultipartFile image)
        throws IOException;

    UserDetailInfoResponse findUserDetailInfo(Long userId);

    void deleteUser(Long userId);

    void makeComplain(UserComplainRequest userComplainRequest);

    UserPublicRoomListResponse getUserPublicRoomList(Long userId);

    BoardListResponse getUserBoardList(Long userId, int page, int size);

    UserInfoResponse findUserInfo(Long userId);
}
