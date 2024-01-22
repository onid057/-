package com.a407.back.model.service;

import com.a407.back.dto.ReportCreateRequest;
import com.a407.back.dto.ReportSearchResponse;
import com.a407.back.dto.ZipsaDetailInfoResponse;

public interface ZipsaService {

    Long saveReport(ReportCreateRequest reportCreateRequest);

    ReportSearchResponse reportFindByRoomId(Long roomId);

    ZipsaDetailInfoResponse zipsaAndReviewFindByZipsaId(Long zipsaId);
}
