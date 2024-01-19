package com.a407.back.model.repo;


import com.a407.back.domain.Room;

public interface RoomRepository {

    Room findByRoomId(Long roomId);
}
