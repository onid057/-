package com.a407.back.controller;

import com.a407.back.domain.Notification;
import com.a407.back.dto.UserNotificationResponse;
import com.a407.back.dto.ZipsaNotificationResponse;
import com.a407.back.model.service.NotificationService;
import com.a407.back.model.service.RoomService;
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
    private final RoomService roomService;

    @GetMapping("/{notificationId}")
    public ResponseEntity<?> getNotificationDetail(
        @PathVariable("notificationId") Long notificationId) {
        Notification notification = notificationService.findByNotificationId(notificationId);
        boolean isZipsa = userService.isWorkedDistinction(notification.getReceiveId());
        if (isZipsa) {
            ZipsaNotificationResponse zipsaNotificationResponse = notificationService.getZipsaNotification(
                notification);
            return ResponseEntity.status(HttpStatus.OK).body(zipsaNotificationResponse);
        }
        UserNotificationResponse userNotificationResponse = notificationService.getUserNotification(
            notification);
        return ResponseEntity.status(HttpStatus.OK).body(userNotificationResponse);
    }

    @GetMapping("/{notificationId}/rejection")
    public ResponseEntity<Integer> rejectNotification(
        @PathVariable("notificationId") Long notificationId) {
        // 해당 알림을 reject
        notificationService.changeNotificationStatusAcceptOrReject(notificationId, "reject");
        // 방에서 알림 숫자를 줄임
        Notification notification = notificationService.findByNotificationId(notificationId);
        int newNotificationCount = roomService.reduceNotificationCount(
            notification.getRoomId().getRoomId());
        // 만약 알림 숫자를 줄였을 때 0이 된다면 방 broken으로 바꿈
        if (newNotificationCount == 0) {
            System.out.println(notification.getRoomId().getRoomId());
            roomService.chageRoomStatus(notification.getRoomId().getRoomId(), "broken");
        }
        return ResponseEntity.status(HttpStatus.OK).body(newNotificationCount);
    }
}
