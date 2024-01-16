package com.a407.back.domain;
import jakarta.persistence.*;
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
    @Column(name = "id", updatable = false)
    private int id;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room_id;

    @Column(name = "content", nullable = false, length = 200)
    private String content;

    @Column(name = "is_read", nullable = false)
    @ColumnDefault("false")
    private boolean isRead;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP")
    private Timestamp createdAt;

    @Builder
    public Notification(int id, String content, boolean isRead, Timestamp createdAt) {
        this.id = id;
        this.content = content;
        this.isRead = isRead;
        this.createdAt = createdAt;
    }
}
