package com.a407.back.model.service;

import com.a407.back.domain.Zipsa;
import com.a407.back.dto.Zipsa.PublicRoomNotificationRequest;
import com.a407.back.dto.Zipsa.ReportCreateRequest;
import com.a407.back.dto.Zipsa.ReportSearchResponse;
import com.a407.back.dto.Zipsa.ZipsaDetailInfoResponse;
import com.a407.back.dto.Zipsa.ZipsaRecordsResponse;
import com.a407.back.dto.Zipsa.ZipsaReservationResponse;

public interface ZipsaService {

    Long makeReport(ReportCreateRequest reportCreateRequest);

    ReportSearchResponse findReportByRoomIdList(Long roomId);

    ZipsaDetailInfoResponse findZipsaAndReviewFindByZipsaId(Long zipsaId);

    Zipsa findByZipsaId(Long zipsaId);

    ZipsaRecordsResponse getUserRecordList(Long helperId);
    
    ZipsaReservationResponse getZipsaReservationList(Long zipsaId);

    void makePublicRoomNotification(PublicRoomNotificationRequest publicRoomNotificationRequest);
}
