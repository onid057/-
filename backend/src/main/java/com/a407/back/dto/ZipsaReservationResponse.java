package com.a407.back.dto;

import com.a407.back.domain.Room;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;

@Getter
public class ZipsaReservationResponse {

    private final List<ZipsaReservationList> list;

    public ZipsaReservationResponse(List<Room> roomList) {
        this.list = new ArrayList<>();
        for (Room room : roomList) {
            list.add(new ZipsaReservationList(room));
        }
    }

}
