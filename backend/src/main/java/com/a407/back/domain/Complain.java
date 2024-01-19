package com.a407.back.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Table(name = "COMPLAIN")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Complain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "complain_id", updatable = false)
    private long complainId;

    @OneToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room roomId;

    @Column(name = "content", nullable = false, length = 50)
    private String content;

    @ColumnDefault("false")
    @Column(name = "is_processed", nullable = false)
    private boolean isProcessed;

    @Builder
    public Complain(Room roomId, String content, boolean isProcessed) {
        this.roomId = roomId;
        this.content = content;
        this.isProcessed = isProcessed;
    }
}
