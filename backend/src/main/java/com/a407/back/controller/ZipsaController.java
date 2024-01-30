package com.a407.back.controller;

import com.a407.back.config.constants.SuccessCode;
import com.a407.back.dto.Zipsa.PublicRoomNotificationRequest;
import com.a407.back.dto.Zipsa.ReportCreateRequest;
import com.a407.back.dto.Zipsa.ReportSearchResponse;
import com.a407.back.dto.Zipsa.ZipsaDetailInfoResponse;
import com.a407.back.dto.Zipsa.ZipsaReservationResponse;
import com.a407.back.dto.util.ApiResponse;
import com.a407.back.model.service.ZipsaServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
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
    public ResponseEntity<Long> reportAdd(@ModelAttribute ReportCreateRequest reportCreateRequest) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(zipsaService.saveReport(reportCreateRequest));
    }

    @GetMapping("/reports/{roomId}")
    public ResponseEntity<ReportSearchResponse> reportSearch(@PathVariable Long roomId) {
        return ResponseEntity.status(HttpStatus.OK).body(zipsaService.reportFindByRoomId(roomId));
    }

    @GetMapping("/{helperId}")
    public ResponseEntity<ZipsaDetailInfoResponse> zipsaDetailInfo(@PathVariable Long helperId) {
        return ResponseEntity.status(HttpStatus.OK)
            .body(zipsaService.zipsaAndReviewFindByZipsaId(helperId));
    }

    @GetMapping("/{helperId}/records")
    public ResponseEntity<?> getUserRecords(@PathVariable Long helperId) {
        return ResponseEntity.status(HttpStatus.OK)
            .body(zipsaService.findRecordsByZipsaId(helperId));
    }

    @GetMapping("/{helperId}/reservations")
    public ResponseEntity<ZipsaReservationResponse> getZipsaReservations(
        @PathVariable Long helperId) {
        return ResponseEntity.status(HttpStatus.OK)
            .body(zipsaService.findReservationByZipsaId(helperId));
    }

    @PostMapping("/participation")
    public ResponseEntity<ApiResponse<String>> makePublicRoomNotification(@RequestBody PublicRoomNotificationRequest publicRoomNotificationRequest) {
        zipsaService.makePublicRoomNotification(publicRoomNotificationRequest);
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.INSERT_SUCCESS, "공개 방 참가 요청이 발신되었습니다."));
    }

}
