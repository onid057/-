package com.a407.back.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.sql.Timestamp;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

@Table(name = "ROOM")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Room implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id", updatable = false)
    private Long roomId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "zipsa_id")
    private Zipsa zipsaId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sub_category_id", nullable = false)
    private SubCategory subCategoryId;

    @Column(name = "content", length = 200, nullable = false)
    private String content;

    @Column(name = "estimate_duration", nullable = false)
    private int estimateDuration;

    @CreationTimestamp
    @Column(name = "room_created_at", columnDefinition = "TIMESTAMP")
    private Timestamp roomCreatedAt;

    @Column(name = "match_created_at", columnDefinition = "TIMESTAMP")
    private Timestamp matchCreatedAt;

    @ColumnDefault("false")
    @Column(name = "is_reported", nullable = false)
    private Boolean isReported;

    @Column(name = "report_cycle")
    private int reportCycle;

    @ColumnDefault("false")
    @Column(name = "is_public", nullable = false)
    private Boolean isPublic;

    @Column(name = "notification_count", nullable = false)
    private int notificationCount;

    @Column(name = "started_at", columnDefinition = "TIMESTAMP")
    private Timestamp startedAt;

    @Column(name = "ended_at", columnDefinition = "TIMESTAMP")
    private Timestamp endedAt;

    @Column(name = "expectation_started_at", columnDefinition = "TIMESTAMP")
    private Timestamp expectationStartedAt;

    @Column(name = "expectation_ended_at", columnDefinition = "TIMESTAMP")
    private Timestamp expectationEndedAt;

    @Column(name = "expectation_pay", nullable = false)
    private int expectationPay;

    @Column(name = "total_pay")
    private int totalPay;

    @ColumnDefault("false")
    @Column(name = "is_complained", nullable = false)
    private Boolean isComplained;

    @ColumnDefault("false")
    @Column(name = "is_reviewed", nullable = false)
    private Boolean isReviewed;

    @ColumnDefault("create")
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private Process status;


    @Builder
    public Room(User userId, Zipsa zipsaId, SubCategory subCategoryId, String content,
        int estimateDuration, Timestamp roomCreatedAt, Timestamp matchCreatedAt,
        Boolean isReported,
        int reportCycle, Boolean isPublic, int notificationCount, Timestamp startedAt,
        Timestamp endedAt, Timestamp expectationStartedAt,
        Timestamp expectationEndedAt, int expectationPay, int totalPay, Boolean isComplained,
        Boolean isReviewed,
        Process status) {
        this.userId = userId;
        this.zipsaId = zipsaId;
        this.subCategoryId = subCategoryId;
        this.content = content;
        this.estimateDuration = estimateDuration;
        this.roomCreatedAt = roomCreatedAt;
        this.matchCreatedAt = matchCreatedAt;
        this.isReported = isReported;
        this.reportCycle = reportCycle;
        this.isPublic = isPublic;
        this.notificationCount = notificationCount;
        this.startedAt = startedAt;
        this.endedAt = endedAt;
        this.expectationStartedAt = expectationStartedAt;
        this.expectationEndedAt = expectationEndedAt;
        this.expectationPay = expectationPay;
        this.totalPay = totalPay;
        this.isComplained = isComplained;
        this.isReviewed = isReviewed;
        this.status = status;
    }

    public enum Process {
        CREATE, BEFORE, ONGOING, END, BROKEN
    }

    @Override
    public String toString() {
        return "Room{" +
            "roomId=" + roomId +
            ", userId=" + userId +
            ", zipsaId=" + zipsaId +
            ", subCategoryId=" + subCategoryId +
            ", content='" + content + '\'' +
            ", estimateDuration=" + estimateDuration +
            ", roomCreatedAt=" + roomCreatedAt +
            ", matchCreatedAt=" + matchCreatedAt +
            ", isReported=" + isReported +
            ", reportCycle=" + reportCycle +
            ", isPublic=" + isPublic +
            ", notificationCount=" + notificationCount +
            ", startedAt=" + startedAt +
            ", endedAt=" + endedAt +
            ", expectationStartedAt=" + expectationStartedAt +
            ", expectationEndedAt=" + expectationEndedAt +
            ", expectationPay=" + expectationPay +
            ", totalPay=" + totalPay +
            ", isComplained=" + isComplained +
            ", isReviewed=" + isReviewed +
            ", status=" + status +
            '}';
    }
}
