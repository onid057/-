package com.a407.back.controller;

import com.a407.back.config.constants.ErrorCode;
import com.a407.back.config.constants.SuccessCode;
import com.a407.back.dto.notification.NotificationListResponse;
import com.a407.back.dto.user.UserAccountRequest;
import com.a407.back.dto.user.UserAccountResponse;
import com.a407.back.dto.user.UserCertificationRequest;
import com.a407.back.dto.user.UserCreateRequest;
import com.a407.back.dto.user.UserNearZipsaInfoResponse;
import com.a407.back.dto.user.UserNearZipsaLocationResponse;
import com.a407.back.dto.user.UserNearZipsaRequest;
import com.a407.back.dto.user.UserPhoneNumberRequest;
import com.a407.back.dto.user.UserRecordsResponse;
import com.a407.back.dto.user.UserReservationResponse;
import com.a407.back.dto.util.ApiResponse;
import com.a407.back.exception.CustomException;
import com.a407.back.model.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @GetMapping("/")
    public ResponseEntity<String> testServer() {
        return ResponseEntity.status(HttpStatus.OK).body("server 이상 무");
    }

    // 알림 목록
    @GetMapping("/{userId}/notifications")
    public ResponseEntity<ApiResponse<List<NotificationListResponse>>> getNotificationList(
        @PathVariable("userId") Long userId) {
        List<NotificationListResponse> notificationResponseList = userService.findNotificationByUserIdList(
            userId);
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.SELECT_SUCCESS, notificationResponseList));
    }

    // 회원가입
    @PostMapping
    public ResponseEntity<ApiResponse<Long>> makeUser(
        @RequestBody UserCreateRequest userCreateRequest) {
        long id = userService.makeUser(userCreateRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, id));
    }

    @PostMapping("/helpers-map/{userId}")
    public ResponseEntity<ApiResponse<List<UserNearZipsaLocationResponse>>> getNearUserLocationList(
        @PathVariable Long userId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                userService.findNearZipsaLocationList(userId)));
    }

    @PostMapping("/helpers-map")
    public ResponseEntity<ApiResponse<List<UserNearZipsaInfoResponse>>> getNearUserInfoList(
        @RequestBody UserNearZipsaRequest userNearZipsaRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                userService.findNearZipsaInfoList(userNearZipsaRequest)));
    }

    @GetMapping("/{userId}/records")
    public ResponseEntity<ApiResponse<List<UserRecordsResponse>>> getUserRecordList(
        @PathVariable Long userId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS, userService.getUserRecordList(userId)));
    }


    @GetMapping("/{userId}/reservations")
    public ResponseEntity<ApiResponse<List<UserReservationResponse>>> getUserReservationList(
        @PathVariable Long userId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                userService.getUserReservationList(userId)));
    }

    @PostMapping("/payments")
    public ResponseEntity<ApiResponse<UserAccountResponse>> makeAccount(
        @RequestBody UserAccountRequest request) {
        UserAccountResponse response = userService.makeAccount(request);
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, response));
    }

    @GetMapping("/{userId}/payments/detail")
    public ResponseEntity<ApiResponse<String>> getMaskedCardNumber(@PathVariable Long userId) {
        String maskedCardNumber = userService.getMaskedCardNumber(userId);
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.SELECT_SUCCESS, maskedCardNumber));
    }

    @DeleteMapping("/{userId}/payments")
    public ResponseEntity<ApiResponse<String>> deleteAccount(@PathVariable Long userId) {
        userService.deleteAccount(userId);
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.DELETE_SUCCESS, "결제 정보 삭제"));
    }

    @PostMapping("/certification/phonenumber")
    public ResponseEntity<ApiResponse<String>> makeSendMessage(
        @RequestBody UserPhoneNumberRequest request)
        throws NoSuchAlgorithmException {
        try {
            userService.makeSendMessage(request.getPhoneNumber(), request.getEmail());
        } catch (JsonProcessingException e) {
            throw new CustomException(ErrorCode.INVALID_PARAMETER);
        }

        return ResponseEntity.status(HttpStatus.CREATED)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, "문자 발송 성공"));
    }

    @PostMapping("/certification/code")
    public ResponseEntity<ApiResponse<String>> makePhoneNumber(
        @RequestBody UserCertificationRequest request) throws JsonProcessingException {
        userService.makePhoneNumber(request.getCode(), request.getEmail());
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, "전화 번호 저장 성공"));
    }

}
