package com.a407.back.controller;

import com.a407.back.config.constants.SuccessCode;
import com.a407.back.dto.util.ApiResponse;
import com.a407.back.dto.zipsa.PublicRoomNotificationRequest;
import com.a407.back.dto.zipsa.ReportCreateRequest;
import com.a407.back.dto.zipsa.ReportSearchResponse;
import com.a407.back.dto.zipsa.ZipsaDetailInfoResponse;
import com.a407.back.dto.zipsa.ZipsaInfoResponse;
import com.a407.back.dto.zipsa.ZipsaRecordsResponse;
import com.a407.back.dto.zipsa.ZipsaReservationResponse;
import com.a407.back.dto.zipsa.ZipsaReviewResponse;
import com.a407.back.model.service.ZipsaServiceImpl;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/helpers")
public class ZipsaController {

    private final ZipsaServiceImpl zipsaService;

    @PostMapping("/reports")
    public ResponseEntity<ApiResponse<String>> makeReport(
        @RequestBody ReportCreateRequest reportCreateRequest) {
        zipsaService.makeReport(reportCreateRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, "정기 보고 생성 성공"));
    }

    @GetMapping("/reports/{roomId}")
    public ResponseEntity<ApiResponse<List<ReportSearchResponse>>> findReportByRoomIdList(
        @PathVariable Long roomId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                zipsaService.findReportByRoomIdList(roomId)));
    }

    @GetMapping("/{helperId}")
    public ResponseEntity<ApiResponse<ZipsaInfoResponse>> findZipsaFindByZipsaId(
        @PathVariable Long helperId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                zipsaService.findZipsaFindByZipsaId(helperId)));
    }

    @GetMapping("/{helperId}/detail")
    public ResponseEntity<ApiResponse<ZipsaDetailInfoResponse>> findZipsaDetailFindByZipsaId(
        @PathVariable Long helperId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                zipsaService.findZipsaDetailFindByZipsaId(helperId)));
    }

    @GetMapping("/{helperId}/reviews")
    public ResponseEntity<ApiResponse<List<ZipsaReviewResponse>>> findsZipsaReviewFindByZipsaId(
        @PathVariable Long helperId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                zipsaService.findsZipsaReviewFindByZipsaId(helperId)));
    }

    @GetMapping("/{helperId}/records")
    public ResponseEntity<ApiResponse<List<ZipsaRecordsResponse>>> searchZipsaRecordList(
        @PathVariable Long helperId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                zipsaService.getZipsaRecordList(helperId)));
    }

    @GetMapping("/{helperId}/reservations")
    public ResponseEntity<ApiResponse<List<ZipsaReservationResponse>>> getZipsaReservationList(
        @PathVariable Long helperId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                zipsaService.getZipsaReservationList(helperId)));
    }

    @PostMapping("/participation")
    public ResponseEntity<ApiResponse<String>> makePublicRoomNotification(
        @RequestBody PublicRoomNotificationRequest publicRoomNotificationRequest) {
        zipsaService.makePublicRoomNotification(publicRoomNotificationRequest);
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, "공개 방 참가 요청이 발신되었습니다."));
    }

}
