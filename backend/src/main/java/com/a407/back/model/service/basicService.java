package com.a407.back.model.service;

import com.a407.back.domain.User;
import com.a407.back.model.repo.basicRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class basicService {
    private final basicRepository basicRepository;
    @Transactional
    public Long save(User user) {
        return basicRepository.save(user).getId();
    }
}
