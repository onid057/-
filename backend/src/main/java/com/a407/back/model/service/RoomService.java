package com.a407.back.model.service;

import com.a407.back.domain.Room;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.MatchCreateRequest;

public interface RoomService {

    Room findByRoomId(Long roomId);

    void chageRoomStatus(Long roomId, String status);

    int reduceNotificationCount(Long roomId);

    void changeRoomZipsa(Zipsa zipsa, Long roomId);

    void makeMatch(MatchCreateRequest matchCreateRequest);
}
