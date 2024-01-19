package com.a407.back.model.repo;


import com.a407.back.domain.Room;
import java.util.List;

public interface RoomRepository {

    List<Room> findAll();
}
