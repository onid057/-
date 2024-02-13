package com.a407.back.controller;

import com.a407.back.config.constants.ErrorCode;
import com.a407.back.config.constants.SuccessCode;
import com.a407.back.dto.board.BoardListResponse;
import com.a407.back.dto.notification.NotificationListResponse;
import com.a407.back.dto.room.UserPublicRoomListResponse;
import com.a407.back.dto.user.UserAccountRequest;
import com.a407.back.dto.user.UserAccountResponse;
import com.a407.back.dto.user.UserCertificationRequest;
import com.a407.back.dto.user.UserChangeRequest;
import com.a407.back.dto.user.UserComplainRequest;
import com.a407.back.dto.user.UserCreateRequest;
import com.a407.back.dto.user.UserDetailInfoResponse;
import com.a407.back.dto.user.UserInfoResponse;
import com.a407.back.dto.user.UserNearZipsaInfoResponse;
import com.a407.back.dto.user.UserNearZipsaLocationResponse;
import com.a407.back.dto.user.UserNearZipsaRequest;
import com.a407.back.dto.user.UserPhoneNumberRequest;
import com.a407.back.dto.user.UserRecordInfoResponse;
import com.a407.back.dto.user.UserRecordResponse;
import com.a407.back.dto.user.UserReservationInfoResponse;
import com.a407.back.dto.user.UserReservationResponse;
import com.a407.back.dto.util.ApiResponse;
import com.a407.back.dto.util.SecurityUser;
import com.a407.back.exception.CustomException;
import com.a407.back.model.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse<UserInfoResponse>> findUserInfo(
        @AuthenticationPrincipal SecurityUser user) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                userService.findUserInfo(user.getUserId())));
    }

    // 회원가입
    @PostMapping
    public ResponseEntity<ApiResponse<Long>> makeUser(
        @RequestBody UserCreateRequest userCreateRequest) {
        long id = userService.makeUser(userCreateRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, id));
    }

    @PatchMapping
    public ResponseEntity<ApiResponse<String>> changeUserInfo(
        @AuthenticationPrincipal SecurityUser user,
        @RequestPart(name = "image", required = false) MultipartFile image,
        @RequestPart(name = "request") UserChangeRequest userChangeRequest) throws IOException {
        userService.changeUserInfo(user.getUserId(), userChangeRequest, image);
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.UPDATE_SUCCESS, "사용자 정보 수정 성공"));
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<String>> deleteUser(
        @AuthenticationPrincipal SecurityUser user) {
        userService.deleteUser(user.getUserId());
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.DELETE_SUCCESS, "회원 정보 삭제 성공"));
    }

    @GetMapping("/boards")
    public ResponseEntity<ApiResponse<BoardListResponse>> getUserBoardList(
        @AuthenticationPrincipal SecurityUser user, @RequestParam("page") int page,
        @RequestParam("size") int size) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                userService.getUserBoardList(user.getUserId(), page, size)));
    }

    @GetMapping("/detail")
    public ResponseEntity<ApiResponse<UserDetailInfoResponse>> findUserDetailInfo(
        @AuthenticationPrincipal SecurityUser user) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                userService.findUserDetailInfo(user.getUserId())));
    }

    // 알림 목록
    @GetMapping("/notifications")
    public ResponseEntity<ApiResponse<List<NotificationListResponse>>> getNotificationList(
        @AuthenticationPrincipal SecurityUser user) {
        List<NotificationListResponse> notificationResponseList = userService.findNotificationByUserIdList(
            user.getUserId());
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.SELECT_SUCCESS, notificationResponseList));
    }

    @GetMapping("/payments")
    public ResponseEntity<ApiResponse<String>> getMaskedCardNumber(
        @AuthenticationPrincipal SecurityUser user) {
        String maskedCardNumber = userService.getMaskedCardNumber(user.getUserId());
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.SELECT_SUCCESS, maskedCardNumber));
    }

    @GetMapping("/records")
    public ResponseEntity<ApiResponse<List<UserRecordResponse>>> getUserRecordList(
        @AuthenticationPrincipal SecurityUser user) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                userService.getUserRecordList(user.getUserId())));
    }

    @GetMapping("/rooms")
    public ResponseEntity<ApiResponse<UserPublicRoomListResponse>> getUserPublicRoomList(
        @AuthenticationPrincipal SecurityUser user) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                userService.getUserPublicRoomList(user.getUserId())));
    }

    @GetMapping("/helpers-map")
    public ResponseEntity<ApiResponse<List<UserNearZipsaLocationResponse>>> getNearUserLocationList(
        @AuthenticationPrincipal SecurityUser user) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                userService.findNearZipsaLocationList(user.getUserId())));
    }

    @GetMapping("/reservations")
    public ResponseEntity<ApiResponse<List<UserReservationResponse>>> getUserReservationList(
        @AuthenticationPrincipal SecurityUser user) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                userService.getUserReservationList(user.getUserId())));
    }

    @PostMapping("/payments")
    public ResponseEntity<ApiResponse<UserAccountResponse>> makeAccount(
        @AuthenticationPrincipal SecurityUser user,
        @RequestBody UserAccountRequest request) {
        UserAccountResponse response = userService.makeAccount(user.getUserId(), request);
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, response));
    }

    @PostMapping("/helpers-map")
    public ResponseEntity<ApiResponse<List<UserNearZipsaInfoResponse>>> getNearUserInfoList(
        @RequestBody UserNearZipsaRequest userNearZipsaRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                userService.findNearZipsaInfoList(userNearZipsaRequest)));
    }

    @PostMapping("/complaint")
    public ResponseEntity<ApiResponse<String>> makeComplain(
        @RequestBody UserComplainRequest userComplainRequest) {
        userService.makeComplain(userComplainRequest);
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, "신고 성공"));
    }


    @PatchMapping("/promise")
    public ResponseEntity<ApiResponse<String>> changeUserCertificated(
        @AuthenticationPrincipal SecurityUser user) {
        userService.changeUserCertificated(user.getUserId());
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, "서약 결과 저장 성공"));
    }

    @DeleteMapping("/payments")
    public ResponseEntity<ApiResponse<String>> deleteAccount(
        @AuthenticationPrincipal SecurityUser user) {
        userService.deleteAccount(user.getUserId());
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.DELETE_SUCCESS, "결제 정보 삭제"));
    }

    @GetMapping("/records/{roomId}")
    public ResponseEntity<ApiResponse<UserRecordInfoResponse>> getUserRecordInfo(
        @PathVariable Long roomId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS, userService.getUserRecordInfo(roomId)));
    }

    @GetMapping("/reservations/{roomId}")
    public ResponseEntity<ApiResponse<UserReservationInfoResponse>> getUserReservationInfo(
        @PathVariable Long roomId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                userService.getUserReservationInfo(roomId)));
    }

    @GetMapping("/reservations/first")
    public ResponseEntity<ApiResponse<UserReservationResponse>> getUserReservationFirst(
        @AuthenticationPrincipal SecurityUser user) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                userService.getUserReservationFirst(user.getUserId())));
    }

    @PostMapping("/certification/code")
    public ResponseEntity<ApiResponse<String>> makePhoneNumber(
        @AuthenticationPrincipal SecurityUser user,
        @RequestBody UserCertificationRequest request) throws JsonProcessingException {
        userService.makePhoneNumber(request.getCode(), user.getEmail());
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, "전화 번호 저장 성공"));
    }

    @PostMapping("/certification/phone-number")
    public ResponseEntity<ApiResponse<String>> makeSendMessage(
        @AuthenticationPrincipal SecurityUser user,
        @RequestBody UserPhoneNumberRequest request)
        throws NoSuchAlgorithmException {
        try {
            userService.makeSendMessage(request.getPhoneNumber(), user.getEmail());
        } catch (JsonProcessingException e) {
            throw new CustomException(ErrorCode.INVALID_PARAMETER);
        }
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, "문자 발송 성공"));
    }

}
