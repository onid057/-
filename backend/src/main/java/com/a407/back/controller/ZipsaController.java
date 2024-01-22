package com.a407.back.controller;

import com.a407.back.config.ErrorCode;
import com.a407.back.dto.ReportCreateRequest;
import com.a407.back.dto.ReportSearchResponse;
import com.a407.back.dto.ZipsaDetailInfoResponse;
import com.a407.back.exception.CustomException;
import com.a407.back.model.service.ZipsaServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/helpers")
public class ZipsaController {

    private final ZipsaServiceImpl zipsaService;

    @PostMapping("/reports")
    public ResponseEntity<Long> reportAdd(@ModelAttribute ReportCreateRequest reportCreateRequest) {
        Long reportId;
        try {
            reportId = zipsaService.saveReport(reportCreateRequest);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.INVALID_PARAMETER);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(reportId);
    }

    @GetMapping("/reports")
    public ResponseEntity<ReportSearchResponse> reportSearch(@RequestParam Long roomId) {
        ReportSearchResponse reportSearchResponse;
        try {
            reportSearchResponse = zipsaService.reportFindByRoomId(roomId);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.INVALID_PARAMETER);
        }
        return ResponseEntity.status(HttpStatus.OK).body(reportSearchResponse);
    }

    @GetMapping("/{helperId}")
    public ResponseEntity<ZipsaDetailInfoResponse> zipsaDetailInfo(@PathVariable Long helperId) {
        return ResponseEntity.status(HttpStatus.OK)
            .body(zipsaService.zipsaAndReviewFindByZipsaId(helperId));
    }


}
