package com.a407.back.config.jwt;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseCookie;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CookieUtil {

    public static String getCookieValue(Cookie[] cookies, String name) {
        if (cookies == null) {
            return null;
        }
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(name)) {
                return cookie.getValue();
            }
        }
        return null;
    }

    public static void saveCookie(String accessToken, String refreshToken,
        HttpServletResponse response, int age) {
        ResponseCookie accessCookie = ResponseCookie.from("Authorization", accessToken)
            .sameSite("None").httpOnly(true).secure(true).path("/")
            .maxAge(age).build();

        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", refreshToken)
            .sameSite("None").httpOnly(true).secure(true).path("/")
            .maxAge(age).build();

        response.addHeader("Set-Cookie", accessCookie.toString());
        response.addHeader("Set-Cookie", refreshCookie.toString());

    }

}
