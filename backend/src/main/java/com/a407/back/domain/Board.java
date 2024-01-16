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
import org.hibernate.annotations.UpdateTimestamp;

@Table(name = "BOARD")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Board {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "board_id", updatable = false)
  private int boardId;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User userId;

  @Column(name = "title", nullable = false, length = 50)
  private String title;

  @Column(name = "content", nullable = false, length = 300)
  private String content;

  @UpdateTimestamp
  @Column(name = "updated_at", columnDefinition = "TIMESTAMP")
  private Timestamp updatedAt;

  @Builder
  public Board(User userId, String title, String content) {
    this.userId = userId;
    this.title = title;
    this.content = content;
  }
}
