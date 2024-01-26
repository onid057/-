package com.a407.back.model.service;

import com.a407.back.domain.Notification;
import com.a407.back.domain.Room;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.Match.MatchCreateRequest;
import com.a407.back.model.repo.NotificationRepository;
import com.a407.back.model.repo.RoomRepository;
import com.a407.back.model.repo.ZipsaRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;

    private final NotificationRepository notificationRepository;

    private final ZipsaRepository zipsaRepository;

    @Override
    public Room findByRoomId(Long roomId) {
        return roomRepository.findByRoomId(roomId);
    }

    @Override
    @Transactional
    public void chageRoomStatus(Long roomId, String status) {
        roomRepository.chageRoomStatus(roomId, status);
    }

    @Override
    @Transactional
    public int reduceNotificationCount(Long roomId) {
        Room room = roomRepository.findByRoomId(roomId);
        return roomRepository.reduceNotificationCount(room.getNotificationCount(), roomId);
    }

    @Override
    @Transactional
    public void changeRoomZipsa(Zipsa zipsa, Long roomId) {
        roomRepository.changeRoomZipsa(zipsa, roomId);
    }

    @Override
    @Transactional
    public void makeMatch(MatchCreateRequest matchCreateRequest) {
        // 수락한 알림은 accept
        notificationRepository.changeNotificationStatusAcceptOrReject(
            matchCreateRequest.getNotificationId(), "accept");
        // 다른 알림들이 있다면 close
        Room room = roomRepository.findByRoomId(matchCreateRequest.getRoomId());
        notificationRepository.changeNotificationStatusClose(room);
        // 후에 방 상태 변경
        roomRepository.chageRoomStatus(matchCreateRequest.getRoomId(), "before");
        // 집사 아이디 입력
        Notification notification = notificationRepository.findByNotificationId(
            matchCreateRequest.getNotificationId());
        Zipsa zipsa = zipsaRepository.findByZipsaId(notification.getReceiveId());
        if (zipsa != null && zipsa.getIsWorked()) {
            zipsa = zipsaRepository.findByZipsaId(notification.getReceiveId());
        } else {
            zipsa = zipsaRepository.findByZipsaId(notification.getSendId());
        }
        roomRepository.changeRoomZipsa(zipsa, matchCreateRequest.getRoomId());
    }
}
