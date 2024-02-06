package com.a407.back.dto.util;

import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BoardChangeDto {

    private Long boardId;
    private String title;
    private String content;
    private Timestamp updatedAt;

}
