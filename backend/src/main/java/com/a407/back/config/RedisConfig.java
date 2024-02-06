package com.a407.back.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Value("${spring.data.redis.certification.host}")
    private String certificationHost;

    @Value("${spring.data.redis.certification.port}")
    private int certificationPort;

    @Value("${spring.data.redis.association.host}")
    private String associationHost;

    @Value("${spring.data.redis.association.port}")
    private int associationPort;

    @Value("${spring.data.redis.token.host}")
    private String tokenHost;

    @Value("${spring.data.redis.token.port}")
    private int tokenPort;

    @Primary
    @Bean(name = "certificationRedisConnectionFactory")
    public RedisConnectionFactory certificationRedisConnectionFactory() {
        return new LettuceConnectionFactory(certificationHost, certificationPort);
    }

    @Bean(name = "associationRedisConnectionFactory")
    public RedisConnectionFactory associationRedisConnectionFactory() {
        return new LettuceConnectionFactory(associationHost, associationPort);
    }

    @Bean(name = "refreshTokenRedisConnectionFactory")
    public RedisConnectionFactory refreshTokenRedisConnectionFactory() {
        return new LettuceConnectionFactory(tokenHost, tokenPort);
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

    private static void redisTemplateSetting(
        RedisConnectionFactory associationRedisConnectionFactory,
        RedisTemplate<String, String> redisTemplate) {
        redisTemplate.setConnectionFactory(associationRedisConnectionFactory);
        redisTemplate.setDefaultSerializer(RedisSerializer.string());
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new StringRedisSerializer());
    }

}