package com.a407.back.dto.util;

import java.sql.Timestamp;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BoardListDto {

    private Long boardId;
    private String title;
    private String userName;
    private int commentCount;
    private Timestamp updatedAt;
    private List<String> tagNameList;

}
