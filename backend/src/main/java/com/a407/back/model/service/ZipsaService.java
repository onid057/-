package com.a407.back.model.service;

import com.a407.back.dto.ReportCreateRequest;
import com.a407.back.dto.ReportSearchResponse;
import com.a407.back.dto.ZipsaDetailInfoResponse;
import java.io.IOException;

public interface ZipsaService {

    Long saveReport(ReportCreateRequest reportCreateRequest) throws IOException;

    ReportSearchResponse reportFindByRoomId(Long roomId);

    ZipsaDetailInfoResponse zipsaAndReviewFindByZipsaId(Long zipsaId) throws IOException;
}
