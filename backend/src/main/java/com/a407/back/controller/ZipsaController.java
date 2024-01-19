package com.a407.back.controller;

import com.a407.back.dto.ReportCreateRequest;
import com.a407.back.model.service.ZipsaServiceImpl;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/helpers")
public class ZipsaController {

    private final ZipsaServiceImpl zipsaService;


    @PostMapping("/reports")
    public ResponseEntity<Long> reportAdd(@ModelAttribute ReportCreateRequest reportCreateRequest)
        throws IOException {

        Long reportId = zipsaService.saveReport(reportCreateRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(reportId);
    }

}
