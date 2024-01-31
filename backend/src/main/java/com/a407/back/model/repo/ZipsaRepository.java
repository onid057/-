package com.a407.back.model.repo;

import com.a407.back.domain.Report;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.Zipsa.ReportSearchResponse;
import com.a407.back.dto.Zipsa.ZipsaDetailInfoResponse;
import com.a407.back.dto.Zipsa.ZipsaRecordsResponse;
import com.a407.back.dto.Zipsa.ZipsaReservationResponse;

public interface ZipsaRepository {

    Long makeReport(Report report);

    ReportSearchResponse findReportByRoomIdList(Long roomId);

    Zipsa findByZipsaId(Long zipsaId);

    ZipsaDetailInfoResponse findZipsaAndReviewFindByZipsaId(Long zipsaId);

    ZipsaRecordsResponse getUserRecordList(Long helperId);

    ZipsaReservationResponse getZipsaReservationList(Long zipsaId);

    void updateZipsaAverage(Long zipsaId, Double kindnessAverage, Double skillAverage,
        Double rewindAverage);

    void changeServiceCountIncrease(Zipsa zipsa);
}
