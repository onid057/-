package com.a407.back.dto.Review;

import com.a407.back.domain.Review;
import com.a407.back.domain.Room;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReviewCreateRequest {


    private Long roomId;
    private String content;
    private int kindnessScore;
    private int skillScore;
    private int rewindScore;

    public Review toEntity(Room room) {
        return Review.builder().userId(room.getUserId()).zipsaId(room.getZipsaId()).content(content)
            .kindnessScore(kindnessScore).skillScore(skillScore).rewindScore(rewindScore).build();
    }
}
