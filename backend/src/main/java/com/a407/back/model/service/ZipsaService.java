package com.a407.back.model.service;

import com.a407.back.domain.Zipsa;
import com.a407.back.dto.room.PublicRoomListResponse;
import com.a407.back.dto.zipsa.PublicRoomNotificationRequest;
import com.a407.back.dto.zipsa.ReportResponse;
import com.a407.back.dto.zipsa.ZipsaChangeRequest;
import com.a407.back.dto.zipsa.ZipsaCreateRequest;
import com.a407.back.dto.zipsa.ZipsaDetailInfoResponse;
import com.a407.back.dto.zipsa.ZipsaInfoResponse;
import com.a407.back.dto.zipsa.ZipsaRecordResponse;
import com.a407.back.dto.zipsa.ZipsaReservationInfoResponse;
import com.a407.back.dto.zipsa.ZipsaReviewResponse;
import com.a407.back.dto.zipsa.ZipsaStatusResponse;
import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface ZipsaService {

    void makeReport(Long roomId, MultipartFile image, String content) throws IOException;

    ReportResponse findReportByRoomIdList(Long roomId);

    ZipsaDetailInfoResponse findZipsaDetailFindByZipsaId(Long zipsaId);

    ZipsaInfoResponse findZipsaFindByZipsaId(Long zipsaId);

    List<ZipsaReviewResponse> findsZipsaReviewFindByZipsaId(Long zipsaId);

    Zipsa findByZipsaId(Long zipsaId);

    List<ZipsaRecordResponse> getZipsaRecordList(Long zipsaId);

    ZipsaReservationInfoResponse getZipsaReservationInfo(Long roomId);

    void makePublicRoomNotification(PublicRoomNotificationRequest publicRoomNotificationRequest);

    PublicRoomListResponse getPublicRoomList(int page, int size);

    void changeZipsaStatus(Long zipsaId);

    ZipsaStatusResponse getZipsaWorkStatus(Long zipsaId);

    void makeConfirmNotification(Long roomId);

    Long makeZipsa(ZipsaCreateRequest zipsaCreateRequest);

    void changeZipsaInfo(Long zipsaId, ZipsaChangeRequest request);

    Boolean findZipsaDistinction(Long userId);

}