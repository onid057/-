package com.a407.back.dto.Review;

import com.a407.back.domain.Review;
import java.sql.Timestamp;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ReviewListResponse {

    private final Long zipsaId;
    private final Long reviewId;
    private final String content;
    private final int kindnessScore;
    private final int skillScore;
    private final int rewindScore;
    private final Timestamp createdAt;

    @Builder
    public ReviewListResponse(Long zipsaId, Long reviewId, String content, int kindnessScore,
        int skillScore, int rewindScore, Timestamp createdAt) {
        this.zipsaId = zipsaId;
        this.reviewId = reviewId;
        this.content = content;
        this.kindnessScore = kindnessScore;
        this.skillScore = skillScore;
        this.rewindScore = rewindScore;
        this.createdAt = createdAt;
    }

    public static ReviewListResponse getDto(Review review) {
        return ReviewListResponse.builder().zipsaId(review.getZipsaId().getZipsaId().getUserId())
            .reviewId(review.getReviewId())
            .content(review.getContent()).kindnessScore(review.getKindnessScore())
            .skillScore(review.getSkillScore()).rewindScore(review.getRewindScore())
            .createdAt(review.getCreatedAt()).build();
    }

}