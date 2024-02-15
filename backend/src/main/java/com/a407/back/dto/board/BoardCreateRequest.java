package com.a407.back.dto.board;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BoardCreateRequest {

    private String title;
    private String content;
    private List<Long> tagList;

}
