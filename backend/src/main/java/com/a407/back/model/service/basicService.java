package com.a407.back.model.service;

import com.a407.back.domain.User;
import com.a407.back.exception.CustomException;
import com.a407.back.config.ErrorCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.a407.back.model.repo.basicRepository;

@Service
@RequiredArgsConstructor
public class basicService {

    private final basicRepository basicRepository;

    @Transactional
    public Long save(User user) {
        // 에러 처리
        if(basicRepository.findByUserEmail(user.getEmail()) != null) throw new CustomException(ErrorCode.INVALID_PARAMETER);
        return basicRepository.save(user).getUserId();
    }
}
