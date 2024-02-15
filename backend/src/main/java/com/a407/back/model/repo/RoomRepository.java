package com.a407.back.model.repo;


import com.a407.back.domain.Room;
import com.a407.back.domain.User;
import com.a407.back.domain.Zipsa;
import com.querydsl.core.QueryResults;
import java.util.List;

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

    QueryResults<Room> getPublicRoomList(int page, int size);

    List<Room> getUserPublicRoomList(User user);

    List<Room> getAllRoomList();

}
