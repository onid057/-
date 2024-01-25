package com.a407.back.controller;

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

    @GetMapping("/{notificationId}")
    public ResponseEntity<?> getNotificationDetail(
        @PathVariable("notificationId") Long notificationId) {
        return ResponseEntity.status(HttpStatus.OK).body(notificationService.getNotification(
            notificationId));
    }

    @GetMapping("/{notificationId}/rejection")
    public ResponseEntity<Integer> rejectNotification(
        @PathVariable("notificationId") Long notificationId) {
        int newNotificationCount = notificationService.rejectNotification(notificationId);
        return ResponseEntity.status(HttpStatus.OK).body(newNotificationCount);
    }
}
