package com.a407.back.config.redis;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Value("${spring.data.redis.host}")
    private String host;

    @Value("${spring.data.redis.certification.port}")
    private int certificationPort;

    @Value("${spring.data.redis.association.port}")
    private int associationPort;

    @Value("${spring.data.redis.token.port}")
    private int tokenPort;

    @Value("${spring.data.redis.sse.port}")
    private int ssePort;

    @Bean(name = "sseRedisConnectionFactory")
    public RedisConnectionFactory sseRedisConnectionFactory() {
        return new LettuceConnectionFactory(host, ssePort);
    }

    @Primary
    @Bean(name = "certificationRedisConnectionFactory")
    public RedisConnectionFactory certificationRedisConnectionFactory() {
        return new LettuceConnectionFactory(host, certificationPort);
    }

    @Bean(name = "associationRedisConnectionFactory")
    public RedisConnectionFactory associationRedisConnectionFactory() {
        return new LettuceConnectionFactory(host, associationPort);
    }

    @Bean(name = "refreshTokenRedisConnectionFactory")
    public RedisConnectionFactory refreshTokenRedisConnectionFactory() {
        return new LettuceConnectionFactory(host, tokenPort);
    }

    @Primary
    @Bean(name = "certificationRedisTemplate")
    public RedisTemplate<String, String> certificationRedisTemplate(
        @Qualifier(value = "certificationRedisConnectionFactory") RedisConnectionFactory certificationRedisConnectionFactory) {
        RedisTemplate<String, String> redisTemplate = new RedisTemplate<>();
        redisTemplateSetting(certificationRedisConnectionFactory, redisTemplate);
        return redisTemplate;
    }


    @Bean(name = "associationRedisTemplate")
    public RedisTemplate<String, String> associationRedisTemplate(
        @Qualifier(value = "associationRedisConnectionFactory") RedisConnectionFactory associationRedisConnectionFactory) {
        RedisTemplate<String, String> redisTemplate = new RedisTemplate<>();
        redisTemplateSetting(associationRedisConnectionFactory, redisTemplate);
        return redisTemplate;
    }

    @Bean(name = "refreshTokenRedisTemplate")
    public RedisTemplate<String, String> refreshTokenRedisTemplate(
        @Qualifier(value = "refreshTokenRedisConnectionFactory") RedisConnectionFactory refreshTokenRedisConnectionFactory) {
        RedisTemplate<String, String> redisTemplate = new RedisTemplate<>();
        redisTemplateSetting(refreshTokenRedisConnectionFactory, redisTemplate);
        return redisTemplate;
    }

    @Bean(name = "sseRedisTemplate")
    public RedisTemplate<String, Object> sseRedisTemplate(
        @Qualifier(value = "sseRedisConnectionFactory") RedisConnectionFactory sseRedisConnectionFactory) {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        sseRedisTemplateSetting(sseRedisConnectionFactory, redisTemplate);
        return redisTemplate;
    }

    @Bean
    public RedisMessageListenerContainer redisMessageListener(
        RedisConnectionFactory connectionFactory) {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        return container;
    }

    private static void redisTemplateSetting(
        RedisConnectionFactory redisConnectionFactory,
        RedisTemplate<String, String> redisTemplate) {
        redisTemplate.setConnectionFactory(redisConnectionFactory);
        redisTemplate.setDefaultSerializer(RedisSerializer.string());
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new StringRedisSerializer());
    }

    private static void sseRedisTemplateSetting(RedisConnectionFactory redisConnectionFactory, RedisTemplate<String, Object> redisTemplate) {
        redisTemplate.setConnectionFactory(redisConnectionFactory);
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<Object>(Object.class));
    }
}