package com.a407.back.model.repo;

import com.a407.back.domain.Zipsa;

public interface ZipsaRepository {

    Zipsa findByZipsaId(Long zipsaId);

}
