package com.a407.back.model.service;

import com.a407.back.domain.Room;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.Match.MatchCreateRequest;
import com.a407.back.dto.Room.MakePublicRoomRequest;

public interface RoomService {

    Room findByRoomId(Long roomId);

    void changeRoomStatus(Long roomId, String status);

    int reduceNotificationCount(Long roomId);

    void changeRoomZipsa(Zipsa zipsa, Long roomId);

    void makeMatch(MatchCreateRequest matchCreateRequest);

    Long makePublicRoom(MakePublicRoomRequest makePublicRoomRequest);
}
