package com.a407.back.model.service;

import com.a407.back.domain.Report;
import com.a407.back.domain.Room;
import com.a407.back.dto.ReportCreateRequest;
import com.a407.back.model.repo.ZipsaRepository;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ZipsaServiceImpl implements ZipsaService {

    private final ZipsaRepository zipsaRepository;


    @Override
    public Long saveReport(ReportCreateRequest reportCreateRequest) throws IOException {

        Room room = zipsaRepository.roomFindById(reportCreateRequest.getRoomId());
        Report report = reportCreateRequest.toEntity(room);
        return zipsaRepository.saveReport(report);
    }

}
