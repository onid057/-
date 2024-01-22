package com.a407.back.controller;

import com.a407.back.dto.NotificationListResponse;
import com.a407.back.dto.UserCreateRequest;
import com.a407.back.dto.UserNearZipsaResponse;
import com.a407.back.model.service.UserService;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
        Long id = userService.save(user.toEntity());
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }

    @GetMapping("/{userId}/notifications")
    public ResponseEntity<List<NotificationListResponse>> getNotifications(
        @PathVariable("userId") Long userId) {
        List<NotificationListResponse> notificationResponseList = userService.findNotificationsByUserId(
            userId);
        return ResponseEntity.status(HttpStatus.OK).body(notificationResponseList);
    }

    @PostMapping("/helpers-map/{userId}")
    public ResponseEntity<UserNearZipsaResponse> getNearUserList(
        @PathVariable Long userId) throws IOException {
        return ResponseEntity.status(HttpStatus.OK)
            .body(userService.findNearZipsaList(userId));
    }
}
