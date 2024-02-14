package com.a407.back.model.repo;

import java.time.Duration;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class AuthRepositoryImpl implements AuthRepository {

    private final RedisTemplate<String, String> redisTemplate;

    public AuthRepositoryImpl(
        @Qualifier("refreshTokenRedisTemplate") RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public void makeRefreshToken(String key, String value) {
        redisTemplate.opsForValue().set(key, value, Duration.ofHours(3));
    }

    @Override
    public String findRefreshToken(String token) {
        return redisTemplate.opsForValue().get(token);
    }

    @Override
    public Boolean deleteToken(String token) {
        return redisTemplate.delete(token);
    }

}
