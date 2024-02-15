package com.a407.back.model.service;

import com.a407.back.config.constants.ErrorCode;
import com.a407.back.config.jwt.TokenProvider;
import com.a407.back.domain.User;
import com.a407.back.dto.auth.Tokens;
import com.a407.back.exception.CustomException;
import com.a407.back.model.repo.AuthRepository;
import com.a407.back.model.repo.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final TokenProvider tokenProvider;

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final AuthRepository authRepository;

    @Override
    @Transactional
    public Tokens login(String email, String password) {
        User user = userRepository.findByUserEmail(email);
        if (user == null || !bCryptPasswordEncoder.matches(password, user.getPassword())) {
            throw new CustomException(ErrorCode.UNAUTHORIZED_ACCESS);
        }

        String accessToken = tokenProvider.makeAccessToken(email);
        String refreshToken = tokenProvider.makeRefreshToken(email);

        authRepository.makeRefreshToken(refreshToken, email);
        return new Tokens(accessToken, refreshToken);
    }

    @Override
    @Transactional
    public void deleteRefreshToken(String token) {
        authRepository.deleteToken(token);
    }

}
