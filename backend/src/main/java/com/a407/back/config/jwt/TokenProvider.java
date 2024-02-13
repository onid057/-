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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenProvider {


    @Value("${jwt.issuer}")
    private String issuer;

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${cookie.age}")
    private Integer cookieMaxAge;

    private final AuthRepository authRepository;

    @Value("${jwt.claim-name}")
    private String claimName;


    public String makeAccessToken(String email) {
        return createToken(email, Duration.ofMinutes(10));
    }

    public String makeRefreshToken(String email) {
        return createToken(email, Duration.ofHours(3));
    }

    private String createToken(String email, Duration time) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + time.toMillis());

        return Jwts.builder().header().type("JWT").and().issuer(issuer)
            .issuedAt(now).expiration(validity).claim(claimName, email)
            .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()), SIG.HS256)
            .compact();
    }

    @Transactional
    public String getEmailFromToken(String accessToken, HttpServletRequest request,
        HttpServletResponse response) {

        try {
            return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(secretKey.getBytes())).build()
                .parseSignedClaims(accessToken).getPayload().get(claimName, String.class);
        } catch (ExpiredJwtException e) {

            String refreshToken = CookieUtil.getCookieValue(request.getCookies(), "refreshToken");

            try {
                String email = Jwts.parser()
                    .verifyWith(Keys.hmacShaKeyFor(secretKey.getBytes())).build()
                    .parseSignedClaims(refreshToken).getPayload().get(claimName, String.class);
                if (!email.equals(authRepository.findRefreshToken(refreshToken))) {
                    return null;
                }

                String newAccessToken = makeAccessToken(email);
                String newRefreshToken = makeRefreshToken(email);

                authRepository.makeRefreshToken(newRefreshToken, email);
                CookieUtil.saveCookie(newAccessToken, newRefreshToken, response,
                    cookieMaxAge);

                return email;
            } catch (Exception error) {
                throw new CustomException(ErrorCode.USER_NOT_FOUND);
            }

        }
    }

    public boolean validationToken(String token) {
        try {
            Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
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
