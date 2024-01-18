package com.a407.back.model.repo;

import com.a407.back.domain.User;

public interface basicRepository {
    User findByUserEmail(String email);
    User save(User user);
}
