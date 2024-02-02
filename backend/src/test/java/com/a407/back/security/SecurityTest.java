package com.a407.back.security;

import static org.assertj.core.api.Assertions.assertThat;

import com.a407.back.BackendApplication;
import com.a407.back.controller.AuthController;
import com.a407.back.controller.UserController;
import com.a407.back.domain.User;
import com.a407.back.domain.User.Gender;
import com.a407.back.dto.auth.AuthRequest;
import com.a407.back.dto.util.SecurityUser;
import com.a407.back.model.service.AuthService;
import com.a407.back.model.service.UserService;
import jakarta.transaction.Transactional;
import java.sql.Timestamp;
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
@Transactional
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


    @Test
    @DisplayName("회원가입")
    void signupTest() {
        User newUser = User.builder().email("make@make.com")
            .password(bCryptPasswordEncoder.encode("make")).name("make")
            .birth(new Timestamp(System.currentTimeMillis())).gender(Gender.MAN).address("주소")
            .latitude(35D).longitude(125D).isAdmin(false).isAffiliated(false).isBlocked(false)
            .isCertificated(false).build();
        Long userId = userService.makeUser(newUser);

        assertThat(userService.findByUserId(userId)).isEqualTo(newUser);

    }


    @Test
    @DisplayName("사용자 로그인")
    void loginTest() {
        User newUser = User.builder().email("make@make.com")
            .password(bCryptPasswordEncoder.encode("make")).name("make")
            .birth(new Timestamp(System.currentTimeMillis())).gender(Gender.MAN).address("주소")
            .latitude(35D).longitude(125D).isAdmin(false).isAffiliated(false).isBlocked(false)
            .isCertificated(false).build();
        Long userId = userService.makeUser(newUser);

        assertThat(userService.findByUserId(userId)).isEqualTo(newUser);

        AuthRequest request = new AuthRequest("make@make.com", "make");
        authService.login(request.getEmail(), request.getPassword());

        SecurityUser securityUser = (SecurityUser) userDetailsService.loadUserByUsername(
            request.getEmail());

        assertThat(securityUser.getAuthorities()).isEqualTo(
            List.of(new SimpleGrantedAuthority("USER")));
        assertThat(securityUser.getEmail()).isEqualTo("make@make.com");
    }

    @Test
    @DisplayName("관리자 로그인")
    void adminTest() {
        AuthRequest request = new AuthRequest("admin@admin.com", "admin");
        authService.login(request.getEmail(), request.getPassword());
        SecurityUser securityUser = (SecurityUser) userDetailsService.loadUserByUsername(
            request.getEmail());
        assertThat(securityUser.getAuthorities()).isEqualTo(
            List.of(new SimpleGrantedAuthority("ADMIN")));
    }


}
