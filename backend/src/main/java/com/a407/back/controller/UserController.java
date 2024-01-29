package com.a407.back.controller;

import com.a407.back.dto.Notification.NotificationListResponse;
import com.a407.back.dto.User.UserAccountRequest;
import com.a407.back.dto.User.UserAccountResponse;
import com.a407.back.dto.User.UserCreateRequest;
import com.a407.back.dto.User.UserNearZipsaResponse;
import com.a407.back.dto.User.UserRecordsResponse;
import com.a407.back.dto.User.UserReservationResponse;
import com.a407.back.model.service.UserService;
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
    public ResponseEntity<Long> userSignUp(@RequestBody UserCreateRequest user) {
        long id = userService.save(user.toEntity());
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
    public ResponseEntity<UserRecordsResponse> getUserRecords(@PathVariable Long userId) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findRecordsByUserId(userId));
    }


    @GetMapping("/{userId}/reservations")
    public ResponseEntity<UserReservationResponse> getUserReservations(@PathVariable Long userId) {
        return ResponseEntity.status(HttpStatus.OK)
            .body(userService.findReservationByUserId(userId));
    }

    @PostMapping("/payments")
    public ResponseEntity<UserAccountResponse> accountAdd(
        @RequestBody UserAccountRequest request
    ) {
        UserAccountResponse response = userService.saveAccount(request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/{userId}/payments/detail")
    public ResponseEntity<String> getAccountDetails(@PathVariable Long userId) {
        String maskedCardNumber = userService.getMaskedCardNumber(userId);
        return ResponseEntity.ok(maskedCardNumber);
    }

    @DeleteMapping("/{userId}/payments")
    public ResponseEntity<Void> accountDelete(@PathVariable Long userId) {
        userService.deleteAccount(userId);
        return ResponseEntity.ok().body(null);
    }

}
