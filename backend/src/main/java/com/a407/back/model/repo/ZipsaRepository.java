package com.a407.back.model.repo;

import com.a407.back.domain.Report;
import com.a407.back.domain.Zipsa;
import com.a407.back.domain.Room;
import com.a407.back.dto.ZipsaDetailInfoResponse;
import java.io.IOException;
import java.util.List;

public interface ZipsaRepository {

    Long saveReport(Report report);

    Room roomFindById(Long roomId);

    List<Report> reportFindByRoomId(Long roomId);

    Zipsa findByZipsaId(Long zipsaId);

    ZipsaDetailInfoResponse zipsaAndReviewFindByZipsaId(Long zipsaId) throws IOException;

}
