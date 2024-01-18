package com.a407.back.domain;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "BOARD_TAG")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class BoardTag {

    @EmbeddedId
    private BoardTagId boardTagId;

    @Builder
    public BoardTag(BoardTagId boardTagId) {
        this.boardTagId = boardTagId;
    }
}
