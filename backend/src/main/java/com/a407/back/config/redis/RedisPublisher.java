package com.a407.back.config.redis;

import com.a407.back.model.service.SseService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Component
@RequiredArgsConstructor
public class RedisPublisher {

    private final RedisTemplate<String, Object> redisTemplate;

    private final RedisMessageListenerContainer redisMessageListenerContainer;

    private final RedisSubscriber redisSubscriber;

    private final SseService sseService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final Map<String, ChannelTopic> channelTopicMap = new ConcurrentHashMap<>();

    @Transactional
    public SseEmitter createTopic(Long userId, HttpServletResponse response) {
        ChannelTopic channelTopic = new ChannelTopic(userId.toString());
        redisMessageListenerContainer.addMessageListener(redisSubscriber, channelTopic);
        channelTopicMap.put(userId.toString(), channelTopic);
        return sseService.connect(userId, response);
    }

    public void send(Long userId) {
        if (channelTopicMap.get(userId.toString()) == null) {
            logger.error("등록되지 않은 채널입니다. {}", userId);
        } else {
            publish(channelTopicMap.get(userId.toString()), userId);
        }
    }

    public void publish(ChannelTopic topic, Object obj) {
        redisTemplate.convertAndSend(topic.getTopic(), obj);
    }
}
