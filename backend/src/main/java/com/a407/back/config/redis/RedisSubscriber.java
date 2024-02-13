package com.a407.back.config.redis;

import com.a407.back.model.service.SseService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RedisSubscriber implements MessageListener {

    private final ObjectMapper objectMapper;

    private final SseService sseService;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    @Transactional
    public void onMessage(Message message, byte[] pattern) {
        try {
            Long publishMessage = objectMapper.readValue(message.getBody(), Long.class);
            logger.info("메세지를 전송합니다. {}", publishMessage);
            sseService.send(publishMessage);
        } catch (Exception e) {
            logger.error(String.valueOf(e));
        }
    }
}
