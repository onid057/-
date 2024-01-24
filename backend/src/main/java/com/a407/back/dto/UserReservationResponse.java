package com.a407.back.dto;

import com.a407.back.domain.Room;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;

@Getter
public class UserReservationResponse {

    private final List<UserReservationList> list;

    public UserReservationResponse(List<Room> roomList) {
        this.list = new ArrayList<>();
        for (Room room : roomList) {
            list.add(new UserReservationList(room));
        }
    }
}
