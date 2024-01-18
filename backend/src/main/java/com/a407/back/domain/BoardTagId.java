package com.a407.back.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
@Getter
@Setter
public class BoardTagId implements Serializable {

    @ManyToOne
    @JoinColumn(name = "board_id")
    public Board boardId;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    public Tag tagId;

}
