package com.a407.back.model.repo;

public interface AuthRepository {

    void makeRefreshToken(String key, String value);

    Boolean findRefreshToken(String token);
}
