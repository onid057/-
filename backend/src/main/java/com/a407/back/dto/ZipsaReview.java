package com.a407.back.dto;

import com.a407.back.config.ImageConfig;
import com.a407.back.domain.Review;
import java.io.IOException;
import java.net.URL;
import java.sql.Timestamp;
import lombok.Getter;

@Getter
public class ZipsaReview {

    private final String userName;
    private final URL profileImage;
    private final String content;
    private final int kindnessScore;
    private final int skillScore;
    private final int rewindScore;
    private final Timestamp createdAt;

    public ZipsaReview(Review review) throws IOException {
        this.userName = review.getUserId().getName();
        if (review.getUserId().getProfileImage() != null) {
            this.profileImage = ImageConfig.toUrl(review.getUserId().getProfileImage());
        } else {
            this.profileImage = null;
        }
        this.content = review.getContent();
        this.kindnessScore = review.getKindnessScore();
        this.skillScore = review.getSkillScore();
        this.rewindScore = review.getRewindScore();
        this.createdAt = review.getCreatedAt();
    }
}
