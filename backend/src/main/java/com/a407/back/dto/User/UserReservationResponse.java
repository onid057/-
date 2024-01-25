package com.a407.back.dto.User;

import com.a407.back.domain.Room;
import com.a407.back.dto.util.UserReservationList;
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
