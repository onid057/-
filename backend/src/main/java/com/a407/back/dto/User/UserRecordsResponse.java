package com.a407.back.dto.User;

import com.a407.back.domain.Room;
import com.a407.back.dto.util.UserRecordsList;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;

@Getter
public class UserRecordsResponse {

    private final List<UserRecordsList> list;

    public UserRecordsResponse(List<Room> roomList) {
        this.list = new ArrayList<>();
        for (Room room : roomList) {
            list.add(new UserRecordsList(room));
        }
    }
}