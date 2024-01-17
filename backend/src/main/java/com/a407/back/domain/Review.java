package com.a407.back.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Table(name = "review")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id", updatable = false)
    private int reviewId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "helper_id")
    private Long helperId;

    @Column(name = "rating")
    private Double rating;

    @Column(name = "content")
    private String content;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Builder
    public Review(int reviewId, long userId, long helperId, double rating, String content,
        LocalDateTime createdAt) {
        this.reviewId = reviewId;
        this.userId = userId;
        this.helperId = helperId;
        this.rating = rating;
        this.content = content;
        this.createdAt = createdAt;
    }
}
