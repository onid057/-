package com.a407.back.security;

import static org.assertj.core.api.Assertions.assertThat;

import com.a407.back.BackendApplication;
import com.a407.back.controller.AuthController;
import com.a407.back.controller.UserController;
import com.a407.back.domain.QUser;
import com.a407.back.domain.User.Gender;
import com.a407.back.dto.auth.AuthRequest;
import com.a407.back.dto.user.UserCreateRequest;
import com.a407.back.dto.util.SecurityUser;
import com.a407.back.model.service.AuthService;
import com.a407.back.model.service.UserService;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ContextConfiguration;

@SpringBootTest
@ContextConfiguration(classes = BackendApplication.class)
@AutoConfigureMockMvc
class SecurityTest {

    @Autowired
    UserService userService;

    @Autowired
    UserController userController;

    @Autowired
    AuthController authController;

    @Autowired
    AuthService authService;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    JPAQueryFactory query;

    @Autowired
    EntityManager em;


    @Test
    @Transactional
    @DisplayName("회원가입")
    void signupTest() {
        UserCreateRequest user = new UserCreateRequest("user@abc.com", "user", "user",
            Date.valueOf(LocalDate.now()), Gender.MAN, "서울시", 36.5, 127.5);

        Long userId = userService.makeUser(user);

        assertThat(userService.findByUserId(userId).getEmail()).isEqualTo("user@abc.com");

    }


    @Test
    @Transactional
    @DisplayName("사용자 로그인")
    void loginTest() {
        UserCreateRequest user = new UserCreateRequest("user@abc.com", "user", "user",
            Date.valueOf(LocalDate.now()), Gender.MAN, "서울시", 36.5, 127.5);

        Long userId = userService.makeUser(user);

        assertThat(userService.findByUserId(userId).getEmail()).isEqualTo("user@abc.com");

        AuthRequest request = new AuthRequest("user@abc.com", "user");
        authService.login(request.getEmail(), request.getPassword());

        SecurityUser securityUser = (SecurityUser) userDetailsService.loadUserByUsername(
            request.getEmail());

        assertThat(securityUser.getAuthorities()).isEqualTo(
            List.of(new SimpleGrantedAuthority("USER")));
        assertThat(securityUser.getEmail()).isEqualTo("user@abc.com");
    }

    @Test
    @Transactional
    @DisplayName("관리자 로그인")
    void adminTest() {
        UserCreateRequest admin = new UserCreateRequest("admin@admin.admin", "admin", "admin",
            Date.valueOf(LocalDate.now()), Gender.MAN, "서울시", 36.5, 127.5);

        changeAdmin(userService.makeUser(admin));
        em.flush();
        em.clear();

        AuthRequest request = new AuthRequest("admin@admin.admin", "admin");
        authService.login(request.getEmail(), request.getPassword());
        SecurityUser securityUser = (SecurityUser) userDetailsService.loadUserByUsername(
            request.getEmail());
        assertThat(securityUser.getAuthorities()).isEqualTo(
            List.of(new SimpleGrantedAuthority("ADMIN")));
    }


    void changeAdmin(Long userId) {
        QUser qUser = QUser.user;
        query.update(qUser).set(qUser.isAdmin, true).where(qUser.userId.eq(userId)).execute();
        em.flush();
        em.clear();
    }


}
