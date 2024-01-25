package com.a407.back.dto.Zipsa;

import com.a407.back.domain.Room;
import com.a407.back.dto.util.ZipsaReservationList;
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
