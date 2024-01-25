package com.a407.back.dto.util;

import com.a407.back.domain.Review;
import java.sql.Timestamp;
import lombok.Getter;

@Getter
public class ZipsaReview {

    private final String userName;
    private final String profileImage;
    private final String content;
    private final int kindnessScore;
    private final int skillScore;
    private final int rewindScore;
    private final Timestamp createdAt;

    public ZipsaReview(Review review) {
        this.userName = review.getUserId().getName();
        if (review.getUserId().getProfileImage() == null) {
            this.profileImage = null;
        } else {
            this.profileImage = new String(review.getUserId().getProfileImage());
        }
        this.content = review.getContent();
        this.kindnessScore = review.getKindnessScore();
        this.skillScore = review.getSkillScore();
        this.rewindScore = review.getRewindScore();
        this.createdAt = review.getCreatedAt();
    }
}
