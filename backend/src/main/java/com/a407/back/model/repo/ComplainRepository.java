package com.a407.back.model.repo;

import com.a407.back.domain.Complain;

public interface ComplainRepository {

    void makeComplain(Complain complain);

    Complain findComplain(Long roomId);

}
