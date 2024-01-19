package com.a407.back.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.sql.Timestamp;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "REVIEW")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id", updatable = false)
    private Long reviewId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User userId;

    @ManyToOne
    @JoinColumn(name = "zipsa_id", nullable = false)
    private Zipsa zipsaId;

    @Column(name = "content", nullable = false, length = 30)
    private String content;

    @Column(name = "kindness_score", nullable = false)
    private int kindnessScore;

    @Column(name = "skill_score", nullable = false)
    private int skillScore;

    @Column(name = "rewind_score", nullable = false)
    private int rewindScore;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP")
    private Timestamp createdAt;

    @Builder
    public Review(User userId, Zipsa zipsaId, String content, int kindnessScore,
        int skillScore, int rewindScore, Timestamp createdAt) {
        this.userId = userId;
        this.zipsaId = zipsaId;
        this.content = content;
        this.kindnessScore = kindnessScore;
        this.skillScore = skillScore;
        this.rewindScore = rewindScore;
        this.createdAt = createdAt;
    }
}
