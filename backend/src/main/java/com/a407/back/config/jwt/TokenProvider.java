package com.a407.back.config.jwt;

import com.a407.back.config.constants.ErrorCode;
import com.a407.back.exception.CustomException;
import com.a407.back.model.repo.AuthRepository;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Jwts.SIG;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import java.time.Duration;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenProvider {

    private final JwtProperties jwtProperties;
    private final AuthRepository authRepository;
    private static final String CLAIM_NAME = "email";


    public String makeAccessToken(String email) {
        return createToken(email, Duration.ofMinutes(15));
    }

    public String makeRefreshToken(String email) {
        return createToken(email, Duration.ofHours(3));
    }

    private String createToken(String email, Duration time) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + time.toMillis());

        return Jwts.builder().header().type("JWT").and().issuer(jwtProperties.getIssuer())
            .issuedAt(now).expiration(validity).claim(CLAIM_NAME, email)
            .signWith(Keys.hmacShaKeyFor(jwtProperties.getSecretKey().getBytes()), SIG.HS256)
            .compact();
    }

    @Transactional
    public String getEmailFromToken(String accessToken, HttpServletRequest request,
        HttpServletResponse response) {

        try {
            return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(jwtProperties.getSecretKey().getBytes())).build()
                .parseSignedClaims(accessToken).getPayload().get(CLAIM_NAME, String.class);
        } catch (ExpiredJwtException e) {

            String refreshToken = CookieUtil.getCookieValue(request.getCookies(), "refreshToken");

            try {
                String email = Jwts.parser()
                    .verifyWith(Keys.hmacShaKeyFor(jwtProperties.getSecretKey().getBytes())).build()
                    .parseSignedClaims(refreshToken).getPayload().get(CLAIM_NAME, String.class);
                if (!email.equals(authRepository.findRefreshToken(refreshToken))) {
                    return null;
                }

                String newAccessToken = makeAccessToken(email);
                String newRefreshToken = makeRefreshToken(email);

                authRepository.makeRefreshToken(newRefreshToken, email);
                CookieUtil.saveCookie(newAccessToken, newRefreshToken, response,
                    CookieUtil.COOKIE_MAX_AGE);

                return email;
            } catch (Exception error) {
                throw new CustomException(ErrorCode.USER_NOT_FOUND);
            }

        }
    }

    public boolean validationToken(String token) {
        try {
            Jwts.parser().verifyWith(Keys.hmacShaKeyFor(jwtProperties.getSecretKey().getBytes()))
                .build().parseSignedClaims(token);
            return true;
        } catch (SignatureException | MalformedJwtException | UnsupportedJwtException |
                 IllegalArgumentException e) {
            return false;
        } catch (ExpiredJwtException error) {
            return true;
        }
    }

}
