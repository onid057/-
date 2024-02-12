package com.a407.back.controller;

import com.a407.back.config.redis.RedisPublisher;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
public class SseController {

    private final RedisPublisher redisPublisher;

    @GetMapping(value = "/sse/{userId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> pubSub(@PathVariable("userId") Long userId, HttpServletResponse response) {
        return ResponseEntity.status(HttpStatus.OK).body(redisPublisher.createTopic(userId, response));
    }
}
