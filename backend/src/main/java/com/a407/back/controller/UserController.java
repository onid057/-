package com.a407.back.controller;

import com.a407.back.config.constants.ErrorCode;
import com.a407.back.config.constants.SuccessCode;
import com.a407.back.dto.Notification.NotificationListResponse;
import com.a407.back.dto.User.UserAccountRequest;
import com.a407.back.dto.User.UserAccountResponse;
import com.a407.back.dto.User.UserCertificationCode;
import com.a407.back.dto.User.UserCreateRequest;
import com.a407.back.dto.User.UserNearZipsaResponse;
import com.a407.back.dto.User.UserPhoneNumberRequest;
import com.a407.back.dto.User.UserRecordsResponse;
import com.a407.back.dto.User.UserReservationResponse;
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

    @PostMapping("/")
    public ResponseEntity<Long> makeUser(@RequestBody UserCreateRequest user) {
        long id = userService.makeUser(user.toEntity());
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }

    // 알림 목록
    @GetMapping("/{userId}/notifications")
    public ResponseEntity<List<NotificationListResponse>> getNotificationList(
        @PathVariable("userId") Long userId) {
        List<NotificationListResponse> notificationResponseList = userService.findNotificationByUserIdList(
            userId);
        return ResponseEntity.status(HttpStatus.OK).body(notificationResponseList);
    }

    @PostMapping("/helpers-map/{userId}")
    public ResponseEntity<UserNearZipsaResponse> getNearUserList(@PathVariable Long userId) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findNearZipsaList(userId));
    }

    @GetMapping("/{userId}/records")
    public ResponseEntity<UserRecordsResponse> getUserRecordList(@PathVariable Long userId) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserRecordList(userId));
    }


    @GetMapping("/{userId}/reservations")
    public ResponseEntity<UserReservationResponse> getUserReservationList(
        @PathVariable Long userId) {
        return ResponseEntity.status(HttpStatus.OK)
            .body(userService.getUserReservationList(userId));
    }

    @PostMapping("/payments")
    public ResponseEntity<UserAccountResponse> makeAccount(
        @RequestBody UserAccountRequest request
    ) {
        UserAccountResponse response = userService.makeAccount(request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/{userId}/payments/detail")
    public ResponseEntity<String> getMaskedCardNumber(@PathVariable Long userId) {
        String maskedCardNumber = userService.getMaskedCardNumber(userId);
        return ResponseEntity.ok(maskedCardNumber);
    }

    @DeleteMapping("/{userId}/payments")
    public ResponseEntity<Void> deleteAccount(@PathVariable Long userId) {
        userService.deleteAccount(userId);
        return ResponseEntity.ok().body(null);
    }

    @PostMapping("/certification/phonenumber")
    public ApiResponse<String> makeSendMessage(
        @RequestBody UserPhoneNumberRequest userPhoneNumberRequest)
        throws NoSuchAlgorithmException {
        // 전화번호만 입력
        try {
            userService.makeSendMessage(userPhoneNumberRequest, "test@test.com");
        } catch (JsonProcessingException e) {
            throw new CustomException(ErrorCode.INVALID_PARAMETER);
        }

        return new ApiResponse<>(SuccessCode.INSERT_SUCCESS, "문자 발송 성공");
    }

    @PostMapping("/certification/code")
    public ApiResponse<String> makePhoneNumber(@RequestBody UserCertificationCode code)
        throws JsonProcessingException {
        userService.makePhoneNumber(code.getCode(), "test@test.com");
        return new ApiResponse<>(SuccessCode.INSERT_SUCCESS, "전화 번호 저장 성공");
    }

}
