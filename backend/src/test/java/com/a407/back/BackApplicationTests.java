package com.a407.back;

import static org.assertj.core.api.Assertions.assertThat;

import com.a407.back.controller.UserController;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BackApplicationTests {

    @Autowired
    UserController userController;

    @Test
    @DisplayName("컨트롤러 실행 테스트")
    void contextLoads() {
        assertThat(userController).isNotNull();
    }

}
