package com.a407.back.model.repo;

public interface AuthRepository {

    void makeRefreshToken(String key, String value);

    String findRefreshToken(String token);
}
