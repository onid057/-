package com.a407.back.model.repo;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Repository
@RequiredArgsConstructor
public class SSERepositoryImpl implements SSERepository{

    private final Map<Long, SseEmitter> emitterMap = new ConcurrentHashMap<>();

    @Override
    public SseEmitter get(Long userId) {
        return emitterMap.get(userId);
    }

    @Override
    public SseEmitter save(Long userId, SseEmitter sseEmitter) {
        emitterMap.put(userId, sseEmitter);
        return sseEmitter;
    }

    @Override
    public void delete(Long userId) {
        emitterMap.remove(userId);
    }

}
