package com.a407.back.model.repo;

import com.a407.back.domain.Report;
import com.a407.back.domain.Room;

public interface ZipsaRepository {

    Long saveReport(Report report);

    Room roomFindById(Long roomId);


}
