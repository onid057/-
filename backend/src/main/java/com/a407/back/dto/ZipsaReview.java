package com.a407.back.dto;

import com.a407.back.domain.Review;
import java.sql.Timestamp;
import lombok.Getter;

@Getter
public class ZipsaReview {

    // 사용자 이름, 내용, 친절, 능숙, 재미, 생성
    private final String userName;
    private final byte[] profileImage;
    private final String content;
    private final int kindnessScore;
    private final int skillScore;
    private final int rewindScore;
    private final Timestamp createdAt;

    public ZipsaReview(Review review) {
        this.userName = review.getUserId().getName();
        this.profileImage = review.getUserId().getProfileImage();
        this.content = review.getContent();
        this.kindnessScore = review.getKindnessScore();
        this.skillScore = review.getSkillScore();
        this.rewindScore = review.getRewindScore();
        this.createdAt = review.getCreatedAt();
    }
}
