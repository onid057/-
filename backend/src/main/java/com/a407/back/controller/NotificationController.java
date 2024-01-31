package com.a407.back.controller;

import com.a407.back.config.constants.SuccessCode;
import com.a407.back.dto.User.UserNotificationResponse;
import com.a407.back.dto.User.ZipsaNotificationResponse;
import com.a407.back.dto.util.ApiResponse;
import com.a407.back.model.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/{notificationId}/user")
    public ResponseEntity<ApiResponse<UserNotificationResponse>> findUserNotificationDetail(
        @PathVariable("notificationId") Long notificationId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                notificationService.findUserNotificationDetail(notificationId)));
    }

    @GetMapping("/{notificationId}/zipsa")
    public ResponseEntity<ApiResponse<ZipsaNotificationResponse>> findZipsaNotificationDetail(
        @PathVariable("notificationId") Long notificationId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                notificationService.findZipsaNotificationDetail(notificationId)));
    }

    @GetMapping("/{notificationId}/rejection")
    public ResponseEntity<Integer> changeNotificationToReject(
        @PathVariable("notificationId") Long notificationId) {
        int newNotificationCount = notificationService.changeNotificationToReject(notificationId);
        return ResponseEntity.status(HttpStatus.OK).body(newNotificationCount);
    }

    @GetMapping("/{notificationId}")
    public ResponseEntity<ApiResponse<Long>> changeRoomToMatch(
        @PathVariable("notificationId") Long notificationId) {
        notificationService.changeRoomToMatch(notificationId);
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.UPDATE_SUCCESS, notificationId));
    }
}
