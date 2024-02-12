package com.a407.back.config.jwt;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

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
        Cookie accessCookie = new Cookie("Authorization", accessToken);
        Cookie refreshCookie = new Cookie("refreshToken", refreshToken);

//        accessCookie.setHttpOnly(true);
//        refreshCookie.setHttpOnly(true);

//        accessCookie.setSecure(true);
//        refreshCookie.setSecure(true);

//        accessCookie.setPath("/");
//        refreshCookie.setPath("/");

        accessCookie.setMaxAge(age);
        refreshCookie.setMaxAge(age);

        response.addCookie(accessCookie);
        response.addCookie(refreshCookie);
    }

}
