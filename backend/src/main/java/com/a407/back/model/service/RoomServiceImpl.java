package com.a407.back.model.service;

import com.a407.back.domain.Room;
import com.a407.back.domain.Zipsa;
import com.a407.back.model.repo.RoomRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;

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
}
