package com.a407.back.model.repo;

import com.a407.back.domain.Report;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.ReportSearchResponse;
import com.a407.back.dto.ZipsaDetailInfoResponse;
import com.a407.back.dto.ZipsaRecordsResponse;

public interface ZipsaRepository {

    Long saveReport(Report report);

    ReportSearchResponse reportFindByRoomId(Long roomId);

    Zipsa findByZipsaId(Long zipsaId);

    ZipsaDetailInfoResponse zipsaAndReviewFindByZipsaId(Long zipsaId);

    ZipsaRecordsResponse findRecordsByZipsaId(Long helperId);
}
