package com.a407.back.model.repo;

import com.a407.back.domain.Report;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.ReportSearchResponse;
import java.io.IOException;

public interface ZipsaRepository {

    Long saveReport(Report report);

    ReportSearchResponse reportFindByRoomId(Long roomId) throws IOException;

    Zipsa findByZipsaId(Long zipsaId);

}
