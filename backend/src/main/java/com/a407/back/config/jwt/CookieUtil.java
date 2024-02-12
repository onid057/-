package com.a407.back.config.jwt;

import jakarta.servlet.http.Cookie;
import java.util.List;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpHeaders;
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
        HttpHeaders headers, int age) {
//        Cookie accessCookie = new Cookie("Authorization", accessToken);
//        Cookie refreshCookie = new Cookie("refreshToken", refreshToken);

//        accessCookie.setHttpOnly(true);
//        refreshCookie.setHttpOnly(true);

//        accessCookie.setSecure(true);
//        refreshCookie.setSecure(true);

//        accessCookie.setPath("/");
//        refreshCookie.setPath("/");

//        accessCookie.setMaxAge(age);
//        refreshCookie.setMaxAge(age);
//
//        response.addCookie(accessCookie);
//        response.addCookie(refreshCookie);

        ResponseCookie accessCookie = ResponseCookie.from("Authorization", accessToken)
            .sameSite("None").httpOnly(false).secure(false)
            .maxAge(age).build();

        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", refreshToken)
            .sameSite("None").httpOnly(false).secure(false)
            .maxAge(age).build();

//        response.setHeader("Set-Cookie",accessCookie.toString());
//        response.addHeader("Set-Cookie",refreshCookie.toString());

        headers.addAll("Set-Cookie", List.of(accessCookie.toString(), refreshCookie.toString()));

//        headers.add("Set-Cooike", accessCookie.toString());
//        headers.add("Set-Cookie", refreshCookie.toString());

    }

}
