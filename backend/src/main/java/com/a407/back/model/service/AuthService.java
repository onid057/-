package com.a407.back.model.service;

import com.a407.back.dto.auth.Tokens;

public interface AuthService {

    Tokens login(String email, String password);

    void deleteRefreshToken(String token);
}
