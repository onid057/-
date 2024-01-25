package com.a407.back.controller;

import com.a407.back.dto.ReportCreateRequest;
import com.a407.back.dto.ReportSearchResponse;
import com.a407.back.dto.ZipsaDetailInfoResponse;
import com.a407.back.model.service.ZipsaServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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


}
