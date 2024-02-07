package com.a407.back.dto.board;

import com.a407.back.dto.util.BoardListDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BoardListResponse {

    private Long totalCount;
    private int nowPage;
    private List<BoardListDto> boardList;

}
