package com.a407.back.model.repo;

import com.a407.back.dto.user.UserPhoneNumberAndEmail;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.Duration;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class RedisRepositoryImpl {

    private final RedisTemplate<String, String> redisTemplate;

    public void makeSendMessage(UserPhoneNumberAndEmail userPhoneNumberAndEmail, String code)
        throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        String value = objectMapper.writeValueAsString(userPhoneNumberAndEmail);
        redisTemplate.opsForValue().set(code, value, Duration.ofMinutes(5));
    }

    public UserPhoneNumberAndEmail findMessage(String code) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(redisTemplate.opsForValue().getAndDelete(code),
            UserPhoneNumberAndEmail.class);
    }


}
