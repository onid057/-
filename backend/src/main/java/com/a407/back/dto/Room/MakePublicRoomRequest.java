package com.a407.back.dto.Room;

import com.a407.back.domain.Room;
import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MakePublicRoomRequest {

    private Long userId;
    private Long subCategoryId;
    private String content;
    private int estimateDuration;
    private Timestamp roomCreatedAt;
    private Timestamp expectationStartedAt;
    private Timestamp expectationEndedAt;
    private int expectationPay;

    public Room toEntity() {
        return Room.builder().content(content).estimateDuration(estimateDuration)
            .roomCreatedAt(roomCreatedAt).expectationEndedAt(expectationEndedAt)
            .expectationStartedAt(expectationStartedAt).expectationPay(expectationPay).build();
    }

}
