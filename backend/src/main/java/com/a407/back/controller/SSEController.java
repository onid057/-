package com.a407.back.controller;

import com.a407.back.model.service.SSEService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
public class SSEController {
    private final SSEService sseService;

    @GetMapping("/sse/{userId}")
    public SseEmitter subscribeToNotificationList(@PathVariable("userId") Long userId) {
        return sseService.connect(userId);
    }
}
