package com.a407.back.model.service;

import com.a407.back.domain.Room;
import com.a407.back.domain.Zipsa;
import com.a407.back.dto.room.MakePublicRoomRequest;
import com.a407.back.dto.room.PublicRoomDetailResponse;
import com.a407.back.dto.room.RoomNotificationListResponse;

public interface RoomService {

    Room findByRoomId(Long roomId);

    void changeRoomStatus(Long roomId, String status);

    int changeNotificationCountDecrease(Long roomId);

    void changeRoomZipsa(Zipsa zipsa, Long roomId);

    Long makePublicRoom(MakePublicRoomRequest makePublicRoomRequest, Long userId);

    void deletePublicRoom(Long roomId);

    PublicRoomDetailResponse getPublicRoomDetail(Long roomId);

    RoomNotificationListResponse getRoomNotificationList(Long roomId);

    void deleteRegularPeriodRoom();

}
