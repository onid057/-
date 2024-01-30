package com.a407.back.model.service;

import com.a407.back.domain.Notification;
import com.a407.back.domain.Notification.Status;
import com.a407.back.domain.Notification.Type;
import com.a407.back.domain.Report;
import com.a407.back.domain.Room;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.Zipsa.PublicRoomNotificationRequest;
import com.a407.back.dto.Zipsa.ReportCreateRequest;
import com.a407.back.dto.Zipsa.ReportSearchResponse;
import com.a407.back.dto.Zipsa.ZipsaDetailInfoResponse;
import com.a407.back.dto.Zipsa.ZipsaRecordsResponse;
import com.a407.back.dto.Zipsa.ZipsaReservationResponse;
import com.a407.back.model.repo.NotificationRepository;
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

    private final NotificationRepository notificationRepository;

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

    @Override
    public ZipsaDetailInfoResponse zipsaAndReviewFindByZipsaId(Long zipsaId) {
        return zipsaRepository.zipsaAndReviewFindByZipsaId(zipsaId);
    }

    @Override
    public Zipsa findByZipsaId(Long zipsaId) {
        return zipsaRepository.findByZipsaId(zipsaId);
    }

    @Override
    public ZipsaRecordsResponse findRecordsByZipsaId(Long helperId) {
        return zipsaRepository.findRecordsByZipsaId(helperId);
    }

    @Override
    public ZipsaReservationResponse findReservationByZipsaId(Long zipsaId) {
        return zipsaRepository.findReservationByZipsaId(zipsaId);
    }

    @Override
    @Transactional
    public void makePublicRoomNotification(
        PublicRoomNotificationRequest publicRoomNotificationRequest) {
        // notification 생성
        Room room = roomRepository.findByRoomId(publicRoomNotificationRequest.getRoomId());
        Notification notification = Notification.builder()
            .sendId(publicRoomNotificationRequest.getZipsaId())
            .receiveId(room.getUserId().getUserId()).roomId(room).type(
                Type.USER).status(Status.STANDBY).isRead(false).build();
        notificationRepository.makeNotification(notification);
        // 방에 notification_count 1 증가
        roomRepository.changeNotificationCountIncrease(room.getNotificationCount(), publicRoomNotificationRequest.getRoomId());
    }

}
