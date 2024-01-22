package com.a407.back.model.service;

import com.a407.back.domain.Zipsa;
import com.a407.back.dto.ReportCreateRequest;
import com.a407.back.dto.ReportSearchResponse;
import java.io.IOException;

public interface ZipsaService {

    Long saveReport(ReportCreateRequest reportCreateRequest) throws IOException;

    ReportSearchResponse reportFindByRoomId(Long roomId);

    Zipsa findByZipsaId(Long zipsaId);
}
