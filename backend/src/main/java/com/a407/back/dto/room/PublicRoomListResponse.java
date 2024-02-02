package com.a407.back.dto.room;

import com.a407.back.dto.util.PublicRoom;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PublicRoomListResponse {
    private Long totalCount;
    private int nowPage;
    private List<PublicRoom> publicRoomList;
}
