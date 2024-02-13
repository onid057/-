package com.a407.back.controller;

import com.a407.back.config.constants.SuccessCode;
import com.a407.back.dto.board.BoardChangeRequest;
import com.a407.back.dto.board.BoardCreateRequest;
import com.a407.back.dto.board.BoardDetailResponse;
import com.a407.back.dto.board.BoardListRequest;
import com.a407.back.dto.board.BoardListResponse;
import com.a407.back.dto.util.ApiResponse;
import com.a407.back.dto.util.SecurityUser;
import com.a407.back.model.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/boards")
public class BoardController {

    private final BoardService boardService;

    @GetMapping
    public ResponseEntity<ApiResponse<BoardListResponse>> findBoardList(
        @ModelAttribute BoardListRequest boardListRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                boardService.findBoardList(boardListRequest)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Long>> makeBoard(
        @AuthenticationPrincipal SecurityUser user,
        @RequestBody BoardCreateRequest boardCreateRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(
            new ApiResponse<>(SuccessCode.INSERT_SUCCESS,
                boardService.makeBoard(user.getUserId(), boardCreateRequest)));
    }


    @GetMapping("/{boardId}")
    public ResponseEntity<ApiResponse<BoardDetailResponse>> findBoardDetail(
        @PathVariable("boardId") Long boardId, @AuthenticationPrincipal SecurityUser user) {
        return ResponseEntity.status(HttpStatus.CREATED).body(
            new ApiResponse<>(SuccessCode.SELECT_SUCCESS,
                boardService.findBoardDetail(boardId, user.getUserId())));
    }

    @PatchMapping("/{boardId}")
    public ResponseEntity<ApiResponse<String>> changeBoard(@PathVariable("boardId") Long boardId,
        @RequestBody BoardChangeRequest boardChangeRequest) {
        boardService.changeBoard(boardId, boardChangeRequest);
        return ResponseEntity.status(HttpStatus.OK).body(
            new ApiResponse<>(SuccessCode.UPDATE_SUCCESS, "게시판 수정이 완료되었습니다."));
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<ApiResponse<String>> deleteBoard(@PathVariable("boardId") Long boardId) {
        boardService.deleteBoard(boardId);
        return ResponseEntity.status(HttpStatus.OK)
            .body(new ApiResponse<>(SuccessCode.DELETE_SUCCESS, "게시판 삭제가 완료되었습니다."));
    }

}
