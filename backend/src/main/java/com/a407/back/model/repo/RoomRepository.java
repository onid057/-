package com.a407.back.model.repo;


import com.a407.back.domain.Room;
import com.a407.back.domain.Zipsa;

public interface RoomRepository {

    Room findByRoomId(Long roomId);

    void changeRoomStatus(Long roomId, String status);

    int changeNotificationCountDecrease(int count, Long roomId);

    void changeNotificationCountIncrease(int count, Long roomId);

    void changeRoomZipsa(Zipsa zipsa, Long roomId);

    void changeRoomReview(Long roomId);

    Long makeRoom(Room room);

    void deletePublicRoom(Room room);

    void changeIsComplained(Long roomId);
}
