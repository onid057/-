package com.a407.back.model.repo;

import com.a407.back.domain.Report;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.Zipsa.ReportSearchResponse;
import com.a407.back.dto.Zipsa.ZipsaDetailInfoResponse;
import com.a407.back.dto.Zipsa.ZipsaRecordsResponse;
import com.a407.back.dto.Zipsa.ZipsaReservationResponse;

public interface ZipsaRepository {

    Long saveReport(Report report);

    ReportSearchResponse reportFindByRoomId(Long roomId);

    Zipsa findByZipsaId(Long zipsaId);

    ZipsaDetailInfoResponse zipsaAndReviewFindByZipsaId(Long zipsaId);

    ZipsaRecordsResponse findRecordsByZipsaId(Long helperId);
    
    ZipsaReservationResponse findReservationByZipsaId(Long zipsaId);
}
