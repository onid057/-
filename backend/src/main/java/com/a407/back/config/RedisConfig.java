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

    @Value("${spring.data.redis.host}")
    private String host;

    @Value("${spring.data.redis.certification.port}")
    private int certificationPort;

    @Value("${spring.data.redis.association.port}")
    private int associationPort;

    @Primary
    @Bean(name = "certificationRedisConnectionFactory")
    public RedisConnectionFactory certificationRedisConnectionFactory() {
        return new LettuceConnectionFactory(host, certificationPort);
    }

    @Bean(name = "associationRedisConnectionFactory")
    public RedisConnectionFactory associationRedisConnectionFactory() {
        return new LettuceConnectionFactory(host, associationPort);
    }

    @Primary
    @Bean(name = "certificationRedisTemplate")
    public RedisTemplate<String, String> certificationRedisTemplate(
        @Qualifier(value = "certificationRedisConnectionFactory") RedisConnectionFactory certificationRedisConnectionFactory) {
        RedisTemplate<String, String> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(certificationRedisConnectionFactory);
        redisTemplate.setDefaultSerializer(RedisSerializer.string());
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new StringRedisSerializer());
        return redisTemplate;
    }


    @Bean(name = "associationRedisTemplate")
    public RedisTemplate<String, String> associationRedisTemplate(
        @Qualifier(value = "associationRedisConnectionFactory") RedisConnectionFactory associationRedisConnectionFactory) {
        RedisTemplate<String, String> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(associationRedisConnectionFactory);
        redisTemplate.setDefaultSerializer(RedisSerializer.string());
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new StringRedisSerializer());
        return redisTemplate;
    }

}