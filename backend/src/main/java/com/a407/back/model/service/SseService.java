package com.a407.back.model.service;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface SseService {

    void send(Long userId);

    SseEmitter connect(Long userId, HttpServletResponse response);

    void sendToClient(SseEmitter sseEmitter, Long userId, Object data);

}
