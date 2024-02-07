package com.a407.back.controller;

import com.a407.back.config.constants.SuccessCode;
import com.a407.back.dto.room.PublicRoomListResponse;
import com.a407.back.dto.util.ApiResponse;
import com.a407.back.dto.zipsa.PublicRoomNotificationRequest;
import com.a407.back.dto.zipsa.ReportSearchResponse;
import com.a407.back.dto.zipsa.ZipsaDetailInfoResponse;
import com.a407.back.dto.zipsa.ZipsaInfoResponse;
import com.a407.back.dto.zipsa.ZipsaRecordsResponse;
import com.a407.back.dto.zipsa.ZipsaReservationResponse;
import com.a407.back.dto.zipsa.ZipsaReviewResponse;
import com.a407.back.dto.zipsa.ZipsaStatusResponse;
import com.a407.back.model.service.ZipsaServiceImpl;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/helpers")
public class ZipsaController {

    private final ZipsaServiceImpl zipsaService;

    @PostMapping("/reports")
    public ResponseEntity<ApiResponse<String>> makeReport(
        @RequestPart("roomId") Long roomId,
        @RequestPart("image") MultipartFile image,
        @RequestPart("content") String content) throws IOException {
        zipsaService.makeReport(roomId, image, content);
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


    @PatchMapping("/{helperId}/reversal")
    public ResponseEntity<ApiResponse<String>> changeZipsaStatus(
        @PathVariable("helperId") Long helperId) {
        zipsaService.changeZipsaStatus(helperId);
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.UPDATE_SUCCESS, "사용자 성격 변경이 완료되었습니다."));
    }

    @GetMapping("/{helperId}/status")
    public ResponseEntity<ApiResponse<ZipsaStatusResponse>> getZipsaWorkStatus(
        @PathVariable("helperId") Long helperId) {
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                zipsaService.getZipsaWorkStatus(helperId)));
    }

    @PostMapping("/participation")
    public ResponseEntity<ApiResponse<String>> makePublicRoomNotification(
        @RequestBody PublicRoomNotificationRequest publicRoomNotificationRequest) {
        zipsaService.makePublicRoomNotification(publicRoomNotificationRequest);
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, "공개 방 참가 요청이 발신되었습니다."));
    }

    @GetMapping("/rooms")
    public ResponseEntity<ApiResponse<PublicRoomListResponse>> getPublicRoomList(
        @RequestParam("page") int page, @RequestParam("size") int size) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                zipsaService.getPublicRoomList(page, size)));
    }

}
