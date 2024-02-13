package com.a407.back.controller;

import static org.assertj.core.api.Assertions.assertThat;

import com.a407.back.BackendApplication;
import com.a407.back.domain.User.Gender;
import com.a407.back.dto.auth.AuthRequest;
import com.a407.back.dto.auth.Tokens;
import com.a407.back.dto.user.UserCreateRequest;
import com.a407.back.model.service.AuthService;
import com.a407.back.model.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import java.sql.Timestamp;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.ContextConfiguration;

@SpringBootTest
@ContextConfiguration(classes = BackendApplication.class)
class AuthControllerTest {


    @Autowired
    AuthService authService;

    @Autowired
    UserService userService;

    @Autowired
    @Qualifier("refreshTokenRedisTemplate")
    RedisTemplate<String, String> redisTemplate;


    private final Logger logger = LoggerFactory.getLogger(this.getClass());



    @BeforeEach
    void test(){
        // 사용자 생성
        UserCreateRequest user = new UserCreateRequest("user@abc.com", "user", "user",
            Timestamp.valueOf("2024-01-01 01:01:01"), Gender.MAN, "서울시", 36.5, 127.5);
        userService.makeUser(user);
    }


    @Test
    @Transactional
    @DisplayName("로그인 테스트")
    void login() {
        AuthRequest authRequest = new AuthRequest("user@abc.com", "user");
        Tokens tokens = authService.login(authRequest.getEmail(), authRequest.getPassword());
        assertThat(tokens).isNotNull();
        assertThat(redisTemplate.opsForValue().getAndDelete(tokens.getRefreshToken())).isNotNull();
    }

    @Test
    @Transactional
    @DisplayName("로그아웃 테스트")
    void logout() {
        AuthRequest authRequest = new AuthRequest("user@abc.com", "user");
        logger.info("데이터 {}, {}", authRequest.getEmail(), authRequest.getPassword());
        Tokens tokens = authService.login(authRequest.getEmail(), authRequest.getPassword());
        assertThat(tokens).isNotNull();
        assertThat(redisTemplate.opsForValue().get(tokens.getRefreshToken())).isNotNull();
        authService.deleteRefreshToken(tokens.getRefreshToken());
        assertThat(redisTemplate.opsForValue().get(tokens.getRefreshToken())).isNull();
    }

}