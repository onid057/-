package com.a407.back.dto.util;

import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommentChangeDto {

    private Long commentId;
    private String content;
    private Timestamp updatedAt;

}
