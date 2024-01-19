package com.a407.back.controller;

import com.a407.back.domain.Notification;
import com.a407.back.dto.UserNotificationResponse;
import com.a407.back.dto.ZipsaNotificationResponse;
import com.a407.back.model.service.NotificationService;
import com.a407.back.model.service.UserService;
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
    private final UserService userService;

    @GetMapping("/{notificationId}")
    public ResponseEntity<?> getNotificationDetail(@PathVariable("notificationId") Long notificationId) {
        Notification notification = notificationService.findByNotificationId(notificationId);
        boolean isZipsa = userService.isWorkedDistinction(notification.getReceiveId());
        System.out.println(isZipsa);
        if (isZipsa) {
            ZipsaNotificationResponse zipsaNotificationResponse = notificationService.getZipsaNotification(
                notification);
            return ResponseEntity.status(HttpStatus.OK).body(zipsaNotificationResponse);
        }
        UserNotificationResponse userNotificationResponse = notificationService.getUserNotification(
            notification);
        return ResponseEntity.status(HttpStatus.OK).body(userNotificationResponse);
    }
}
