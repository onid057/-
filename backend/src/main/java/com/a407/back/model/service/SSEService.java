package com.a407.back.model.service;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface SSEService {
    void send(Long userId);
    SseEmitter connect(Long userId);
}
