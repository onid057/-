package com.a407.back.dto.board;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BoardListRequest {

    Integer page;
    Integer size;
    List<Long> tagList;

}
