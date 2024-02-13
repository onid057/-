package com.a407.back.model.service;

import com.a407.back.dto.board.BoardChangeRequest;
import com.a407.back.dto.board.BoardCreateRequest;
import com.a407.back.dto.board.BoardDetailResponse;
import com.a407.back.dto.board.BoardListRequest;
import com.a407.back.dto.board.BoardListResponse;

public interface BoardService {

    Long makeBoard(Long userId, BoardCreateRequest boardCreateRequest);

    void changeBoard(Long boardId, BoardChangeRequest boardChangeRequest);

    void deleteBoard(Long boardId);

    BoardListResponse findBoardList(BoardListRequest boardListRequest);

    BoardDetailResponse findBoardDetail(Long boardId, Long userId);
}
