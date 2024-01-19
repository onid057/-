package com.a407.back.model.repo;

import com.a407.back.domain.Report;
import com.a407.back.domain.Room;
import java.util.List;

public interface ZipsaRepository {

    Long saveReport(Report report);

    Room roomFindById(Long roomId);

    List<Report> reportFindByRoomId(Long roomId);


}
