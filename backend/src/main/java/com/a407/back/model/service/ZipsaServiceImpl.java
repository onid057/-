package com.a407.back.model.service;

import com.a407.back.domain.Report;
import com.a407.back.domain.Room;
import com.a407.back.dto.ReportCreateRequest;
import com.a407.back.dto.ReportSearchResponse;
import com.a407.back.model.repo.RoomRepository;
import com.a407.back.model.repo.ZipsaRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ZipsaServiceImpl implements ZipsaService {

    private final ZipsaRepository zipsaRepository;
    private final RoomRepository roomRepository;

    @Override
    @Transactional
    public Long saveReport(ReportCreateRequest reportCreateRequest) {
        Room room = roomRepository.findByRoomId(reportCreateRequest.getRoomId());
        Report report = reportCreateRequest.toEntity(room);
        return zipsaRepository.saveReport(report);
    }

    @Override
    public ReportSearchResponse reportFindByRoomId(Long roomId) {
        return zipsaRepository.reportFindByRoomId(roomId);
    }

}
