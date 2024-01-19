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
import java.sql.Timestamp;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

@Table(name = "NOTIFICATION")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id", updatable = false)
    private Long notificationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room roomId;

    @ColumnDefault("false")
    @Column(name = "is_read", nullable = false)
    private boolean isRead;

    @CreationTimestamp
    @Column(name = "created_at", columnDefinition = "TIMESTAMP")
    private Timestamp createdAt;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private Type type;

    @ColumnDefault("false")
    @Column(name = "is_accepted", nullable = false)
    private boolean isAccepted;

    @Builder
    public Notification(User userId, Room roomId, boolean isRead,
        Timestamp createdAt, Type type, boolean isAccepted) {
        this.userId = userId;
        this.roomId = roomId;
        this.isRead = isRead;
        this.createdAt = createdAt;
        this.type = type;
        this.isAccepted = isAccepted;
    }

    @Override
    public String toString() {
        return "Notification{" +
            "notificationId=" + notificationId +
            ", userId=" + userId +
            ", roomId=" + roomId +
            ", isRead=" + isRead +
            ", createdAt=" + createdAt +
            ", type=" + type +
            ", isAccepted=" + isAccepted +
            '}';
    }

    public enum Type {
        user, zipsa
    }
}
