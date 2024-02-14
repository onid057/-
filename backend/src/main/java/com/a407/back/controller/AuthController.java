package com.a407.back.controller;

import com.a407.back.config.constants.ErrorCode;
import com.a407.back.config.constants.SuccessCode;
import com.a407.back.config.jwt.CookieUtil;
import com.a407.back.dto.auth.AuthRequest;
import com.a407.back.dto.auth.Tokens;
import com.a407.back.dto.util.ApiResponse;
import com.a407.back.exception.CustomException;
import com.a407.back.model.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @Value("${jwt.refresh-token}")
    private String refreshTokenName;

    @Value("${cookie.age}")
    private Integer cookieMaxAge;

    @PostMapping("/sign-in")
    public ResponseEntity<ApiResponse<String>> login(@RequestBody AuthRequest authRequest,
        HttpServletRequest request, HttpServletResponse response) {
        if (CookieUtil.getCookieValue(request.getCookies(), refreshTokenName) != null) {
            throw new CustomException(ErrorCode.BAD_REQUEST_ERROR);
        }
        Tokens tokens = authService.login(authRequest.getEmail(), authRequest.getPassword());
        HttpHeaders headers = new HttpHeaders();
        CookieUtil.saveCookie(tokens.getAccessToken(), tokens.getRefreshToken(), response,
            cookieMaxAge);
        return ResponseEntity.status(HttpStatus.OK).headers(headers)
            .body(new ApiResponse<>(SuccessCode.SELECT_SUCCESS, "로그인 성공"));
    }

    @PostMapping("/sign-out")
    public ResponseEntity<ApiResponse<String>> logout(HttpServletRequest request,
        HttpServletResponse response) {
        String refreshToken = CookieUtil.getCookieValue(request.getCookies(), refreshTokenName);
        if (refreshToken != null) {
            authService.deleteRefreshToken(refreshToken);
        }
        CookieUtil.saveCookie("accessToken", "refreshToken", response, 0);
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.DELETE_SUCCESS, "로그아웃 성공"));
    }

}