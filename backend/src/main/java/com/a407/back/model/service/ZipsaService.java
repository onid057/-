package com.a407.back.model.service;

import com.a407.back.domain.Zipsa;
import com.a407.back.dto.zipsa.PublicRoomNotificationRequest;
import com.a407.back.dto.zipsa.ReportCreateRequest;
import com.a407.back.dto.zipsa.ReportSearchResponse;
import com.a407.back.dto.zipsa.ZipsaDetailInfoResponse;
import com.a407.back.dto.zipsa.ZipsaRecordsResponse;
import com.a407.back.dto.zipsa.ZipsaReservationResponse;
import java.util.List;

public interface ZipsaService {

    void makeReport(ReportCreateRequest reportCreateRequest);

    List<ReportSearchResponse> findReportByRoomIdList(Long roomId);

    ZipsaDetailInfoResponse findZipsaAndReviewFindByZipsaId(Long zipsaId);

    Zipsa findByZipsaId(Long zipsaId);

    List<ZipsaRecordsResponse> getZipsaRecordList(Long helperId);

    List<ZipsaReservationResponse> getZipsaReservationList(Long zipsaId);

    void makePublicRoomNotification(PublicRoomNotificationRequest publicRoomNotificationRequest);
}
