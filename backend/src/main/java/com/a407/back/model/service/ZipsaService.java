package com.a407.back.model.service;

import com.a407.back.domain.Zipsa;
import com.a407.back.dto.Zipsa.ReportCreateRequest;
import com.a407.back.dto.Zipsa.ReportSearchResponse;
import com.a407.back.dto.Zipsa.ZipsaDetailInfoResponse;
import com.a407.back.dto.Zipsa.ZipsaRecordsResponse;
import com.a407.back.dto.Zipsa.ZipsaReservationResponse;

public interface ZipsaService {

    Long saveReport(ReportCreateRequest reportCreateRequest);

    ReportSearchResponse reportFindByRoomId(Long roomId);

    ZipsaDetailInfoResponse zipsaAndReviewFindByZipsaId(Long zipsaId);

    Zipsa findByZipsaId(Long zipsaId);

    ZipsaRecordsResponse findRecordsByZipsaId(Long helperId);
    
    ZipsaReservationResponse findReservationByZipsaId(Long zipsaId);
}
