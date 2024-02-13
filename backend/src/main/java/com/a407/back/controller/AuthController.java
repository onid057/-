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
import jakarta.servlet.http.HttpSession;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {



    private final AuthService authService;

    @Value("${jwt.refresh-token}")
    private String refreshTokenName;


    @Value("${cookie.age}")
    private Integer cookieMaxAge;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());


    @PostMapping("/sign-in")
    public ResponseEntity<ApiResponse<String>> login(@RequestBody AuthRequest authRequest,
        HttpServletRequest request, HttpServletResponse response, HttpSession session) {

        if (CookieUtil.getCookieValue(request.getCookies(), refreshTokenName) != null) {
            throw new CustomException(ErrorCode.BAD_REQUEST_ERROR);
        }

        Tokens tokens = authService.login(authRequest.getEmail(), authRequest.getPassword());
        logger.info(String.valueOf(tokens));
//        HttpHeaders headers = new HttpHeaders();

//        CookieUtil.saveCookie(tokens.getAccessToken(), tokens.getRefreshToken(), response,
//            cookieMaxAge);

            ResponseCookie accessCookie = ResponseCookie.from("Authorization", tokens.getAccessToken())
                .sameSite("Strict").httpOnly(true).secure(false).path("/").domain("localhost")
                .maxAge(cookieMaxAge).build();

            ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", tokens.getRefreshToken())
                .sameSite("None").httpOnly(true).secure(true).path("/").domain("i10a407.p.ssafy.io")
                .maxAge(cookieMaxAge).build();

//            response.setHeader("Set-Cookie", accessCookie.toString());
//            response.addHeader("Set-Cookie", refreshCookie.toString());
//
//        session.setAttribute("uid", Optional.ofNullable((UUID) session.getAttribute("uid"))
//            .orElse(UUID.randomUUID()));
//        return ResponseEntity.status(HttpStatus.OK).headers(headers)
//            .body(new ApiResponse<>(SuccessCode.SELECT_SUCCESS, "로그인 성공"));
        return ResponseEntity.status(HttpStatus.OK).header(HttpHeaders.SET_COOKIE, accessCookie.toString())
            .body(new ApiResponse<>(SuccessCode.SELECT_SUCCESS, "access token 발급"));
    }

    @PostMapping("/sign-out")
    public ResponseEntity<ApiResponse<String>> logout(HttpServletRequest request,
        HttpServletResponse response, HttpSession session) {

        String refreshToken = CookieUtil.getCookieValue(request.getCookies(), refreshTokenName);

        if (refreshToken != null) {
            authService.deleteRefreshToken(refreshToken);
        }

        CookieUtil.saveCookie("", "", response, 0);
        session.invalidate();
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.DELETE_SUCCESS, "로그아웃 성공"));
    }


}
