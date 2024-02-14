package com.a407.back.controller;

import com.a407.back.config.constants.SuccessCode;
import com.a407.back.dto.room.PublicRoomListResponse;
import com.a407.back.dto.util.ApiResponse;
import com.a407.back.dto.util.SecurityUser;
import com.a407.back.dto.zipsa.PublicRoomNotificationRequest;
import com.a407.back.dto.zipsa.ReportCreateRequest;
import com.a407.back.dto.zipsa.ReportResponse;
import com.a407.back.dto.zipsa.ZipsaChangeRequest;
import com.a407.back.dto.zipsa.ZipsaCreateRequest;
import com.a407.back.dto.zipsa.ZipsaDetailInfoResponse;
import com.a407.back.dto.zipsa.ZipsaInfoResponse;
import com.a407.back.dto.zipsa.ZipsaRecordResponse;
import com.a407.back.dto.zipsa.ZipsaReservationInfoResponse;
import com.a407.back.dto.zipsa.ZipsaReviewResponse;
import com.a407.back.dto.zipsa.ZipsaStatusResponse;
import com.a407.back.model.service.ZipsaServiceImpl;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

    @GetMapping("/{helperId}")
    public ResponseEntity<ApiResponse<ZipsaInfoResponse>> findZipsaFindByZipsaId(
        @PathVariable Long helperId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                zipsaService.findZipsaFindByZipsaId(helperId)));
    }

    @GetMapping("/rooms")
    public ResponseEntity<ApiResponse<PublicRoomListResponse>> getPublicRoomList(
        @RequestParam("page") int page, @RequestParam("size") int size) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                zipsaService.getPublicRoomList(page, size)));
    }

    @GetMapping("/status")
    public ResponseEntity<ApiResponse<ZipsaStatusResponse>> getZipsaWorkStatus(
        @AuthenticationPrincipal SecurityUser user) {
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                zipsaService.getZipsaWorkStatus(user.getUserId())));
    }

    @PostMapping("/reports")
    public ResponseEntity<ApiResponse<String>> makeReport(
        @RequestPart("image") MultipartFile image,
        @RequestPart("request") ReportCreateRequest reportCreateRequest
    ) throws IOException {
        zipsaService.makeReport(reportCreateRequest.getRoomId(), image,
            reportCreateRequest.getContent());
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, "정기 보고 생성 성공"));
    }

    @PostMapping("/participation")
    public ResponseEntity<ApiResponse<String>> makePublicRoomNotification(
        @RequestBody PublicRoomNotificationRequest publicRoomNotificationRequest) {
        zipsaService.makePublicRoomNotification(publicRoomNotificationRequest);
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, "공개 방 참가 요청이 발신되었습니다."));
    }

    @PatchMapping("/reversal")
    public ResponseEntity<ApiResponse<String>> changeZipsaStatus(
        @AuthenticationPrincipal SecurityUser user) {
        zipsaService.changeZipsaStatus(user.getUserId());
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.UPDATE_SUCCESS, "사용자 성격 변경이 완료되었습니다."));
    }

    @GetMapping("/distinction")
    public ResponseEntity<ApiResponse<Boolean>> findZipsaDistinction(
        @AuthenticationPrincipal SecurityUser user) {
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                zipsaService.findZipsaDistinction(user.getUserId())));
    }

    @GetMapping("/reports/{roomId}")
    public ResponseEntity<ApiResponse<ReportResponse>> findReportByRoomIdList(
        @PathVariable Long roomId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                zipsaService.findReportByRoomIdList(roomId)));
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

    @GetMapping("/records")
    public ResponseEntity<ApiResponse<List<ZipsaRecordResponse>>> getZipsaRecordList(
        @AuthenticationPrincipal SecurityUser user) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                zipsaService.getZipsaRecordList(user.getUserId())));
    }

    @GetMapping("/reservations/{roomId}")
    public ResponseEntity<ApiResponse<ZipsaReservationInfoResponse>> getZipsaReservationInfo(
        @PathVariable Long roomId) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                zipsaService.getZipsaReservationInfo(roomId)));
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

    @PostMapping
    public ResponseEntity<ApiResponse<Long>> makeZipsa(
        @RequestBody ZipsaCreateRequest zipsaCreateRequest) {
        long id = zipsaService.makeZipsa(zipsaCreateRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, id));
    }

    @PatchMapping
    public ResponseEntity<ApiResponse<String>> changeZipsaInfo(
        @AuthenticationPrincipal SecurityUser user,
        @RequestBody ZipsaChangeRequest request) {
        zipsaService.changeZipsaInfo(user.getUserId(), request);
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.UPDATE_SUCCESS, "집사 정보 수정 성공"));
    }

}
