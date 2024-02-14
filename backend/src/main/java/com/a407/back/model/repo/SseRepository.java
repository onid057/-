package com.a407.back.model.repo;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface SseRepository {

    SseEmitter get(Long userId);

    SseEmitter save(Long userId, SseEmitter sseEmitter);

    void delete(Long userId);

}
