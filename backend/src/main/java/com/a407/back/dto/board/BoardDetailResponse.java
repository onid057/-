package com.a407.back.dto.board;

import com.a407.back.dto.util.CommentListDto;
import java.sql.Timestamp;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BoardDetailResponse {
    private String userName;
    private String address;
    private String profileImage;
    private String title;
    private String content;
    private Timestamp updatedAt;
    private List<CommentListDto> commentList;
    private List<String> tagList;
    private Boolean boardDistinction;
}
