package com.a407.back.model.service;

import com.a407.back.config.constants.ErrorCode;
import com.a407.back.domain.Board;
import com.a407.back.domain.BoardTag;
import com.a407.back.domain.BoardTagId;
import com.a407.back.domain.Comment;
import com.a407.back.domain.Tag;
import com.a407.back.domain.User;
import com.a407.back.dto.board.BoardChangeRequest;
import com.a407.back.dto.board.BoardCreateRequest;
import com.a407.back.dto.board.BoardDetailResponse;
import com.a407.back.dto.board.BoardListRequest;
import com.a407.back.dto.board.BoardListResponse;
import com.a407.back.dto.util.BoardChangeDto;
import com.a407.back.dto.util.BoardListDto;
import com.a407.back.dto.util.CommentListDto;
import com.a407.back.exception.CustomException;
import com.a407.back.model.repo.BoardRepository;
import com.a407.back.model.repo.CommentRepository;
import com.a407.back.model.repo.UserRepository;
import jakarta.transaction.Transactional;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;

    private final UserRepository userRepository;

    private final CommentRepository commentRepository;

    @Override
    @Transactional
    public Long makeBoard(Long userId, BoardCreateRequest boardCreateRequest) {
        User user = userRepository.findByUserId(userId);
        Long boardId = boardRepository.makeBoard(
            Board.builder().title(boardCreateRequest.getTitle())
                .content(boardCreateRequest.getContent())
                .updatedAt(Timestamp.valueOf(LocalDateTime.now()))
                .userId(user).build());
        Board board = boardRepository.findBoard(boardId);
        for (Long tagId : boardCreateRequest.getTagList()) {
            Tag tag = boardRepository.findTag(tagId);
            BoardTagId boardTagId = BoardTagId.builder().board(board).tag(tag).build();
            BoardTag boardTag = BoardTag.builder().boardTagId(boardTagId).build();
            boardRepository.makeBoardTag(boardTag);
        }
        return boardId;
    }

    @Override
    @Transactional
    public void changeBoard(Long boardId, BoardChangeRequest boardChangeRequest) {
        Board board = boardRepository.findBoard(boardId);
        if (board.getTitle() == null) {
            throw new CustomException(ErrorCode.BAD_REQUEST_ERROR);
        }
        String title = board.getTitle();
        String content = board.getContent();
        if (boardChangeRequest.getTitle() != null && !boardChangeRequest.getTitle().isEmpty()) {
            title = boardChangeRequest.getTitle();
        }
        if (boardChangeRequest.getContent() != null && !boardChangeRequest.getContent().isEmpty()) {
            content = boardChangeRequest.getContent();
        }
        BoardChangeDto boardChangeDto = new BoardChangeDto(board.getBoardId(), title, content,
            Timestamp.valueOf(LocalDateTime.now()));
        boardRepository.changeBoard(boardChangeDto);

        // 해당 게시판의 태그 목록을 가져오기
        List<BoardTag> boardTagList = boardRepository.findBoardTagList(board);
        // 태그 아이디만을 뽑아서 리스트로 만들기
        Map<Long, Integer> tagIdMap = new HashMap<>();
        for (BoardTag boardTag : boardTagList) {
            tagIdMap.put(boardTag.getBoardTagId().tagId.getTagId(), 1);
        }

        // 요청으로 들어온 태그 id 와 맞는다면 유지, 맞지 않다면 없애고 새로 생성
        for (Long tagId : boardChangeRequest.getTagList()) {
            if (tagIdMap.containsKey(tagId)) {
                tagIdMap.remove(tagId);
            } else {
                Tag tag = boardRepository.findTag(tagId);
                BoardTagId boardTagId = BoardTagId.builder().board(board).tag(tag).build();
                BoardTag boardTag = BoardTag.builder().boardTagId(boardTagId).build();
                boardRepository.makeBoardTag(boardTag);
            }
        }
        // tagIdMap에 tagId가 남아있다면 BoardTag 삭제
        for (Long tagId : tagIdMap.keySet()) {
            Tag tag = boardRepository.findTag(tagId);
            boardRepository.deleteBoardTag(board, tag);
        }
    }

    @Override
    @Transactional
    public void deleteBoard(Long boardId) {
        // boardTagList 삭제
        Board board = boardRepository.findBoard(boardId);
        if (board == null) {
            throw new CustomException(ErrorCode.BAD_REQUEST_ERROR);
        }
        boardRepository.deleteBoardTagList(board);

        // comment 삭제
        List<Comment> commentList = commentRepository.findCommentList(board);
        for (Comment comment : commentList) {
            commentRepository.deleteComment(comment);
        }

        // 게시판 삭제
        boardRepository.deleteBoard(board);
    }

    @Override
    public BoardListResponse findBoardList(BoardListRequest boardListRequest) {
        List<BoardTag> totalBoardList = boardRepository.findBoardList(
            (boardListRequest.getPage() - 1) * boardListRequest.getSize(),
            boardListRequest.getSize(), boardListRequest.getTagList());
        List<Long> countBoard = new ArrayList<>();
        List<BoardListDto> boardList = new ArrayList<>();
        for (BoardTag boardTag : totalBoardList) {
            if (countBoard.contains(boardTag.getBoardTagId().boardId.getBoardId())) {
                continue;
            }
            countBoard.add(boardTag.getBoardTagId().boardId.getBoardId());
            // 게시판의 댓글 개수 계산하기
            int commentCount = commentRepository.getCommentCount(boardTag.getBoardTagId().boardId)
                .intValue();
            // 게시판의 태그 이름들 리스트로 변환하여 전송
            List<BoardTag> tagList = boardRepository.findBoardTagList(
                boardTag.getBoardTagId().boardId);
            List<String> tagNameList = tagList.stream()
                .map(boardTagList -> boardTagList.getBoardTagId().tagId.getName()).toList();
            boardList.add(new BoardListDto(boardTag.getBoardTagId().boardId.getBoardId(),
                boardTag.getBoardTagId().boardId.getTitle(),
                boardTag.getBoardTagId().boardId.getUserId().getName(), commentCount,
                boardTag.getBoardTagId().boardId.getUpdatedAt(), tagNameList));
        }
        return new BoardListResponse(countBoard.size(), boardListRequest.getPage(), boardList);
    }

    @Override
    public BoardDetailResponse findBoardDetail(Long boardId, Long userId) {
        Board board = boardRepository.findBoard(boardId);
        User user = userRepository.findByUserId(board.getUserId().getUserId());
        List<CommentListDto> commentList = commentRepository.findCommentList(board).stream()
            .map(
                comment -> {
                    boolean commentDistinction = Objects.equals(comment.getUserId().getUserId(),
                        userId);
                    return new CommentListDto(comment.getCommentId(), comment.getUserId().getName(),
                        comment.getContent(),
                        comment.getUpdatedAt(), commentDistinction);
                }
            ).toList();

        List<String> tagList = boardRepository.findBoardTagList(board).stream()
            .map(boardTag -> boardTag.getBoardTagId().tagId.getName()).toList();
        boolean boardDistinction = Objects.equals(board.getUserId().getUserId(), userId);
        return new BoardDetailResponse(user.getName(), user.getAddress(), user.getProfileImage(),
            board.getTitle(),
            board.getContent(), board.getUpdatedAt(), commentList, tagList, boardDistinction);
    }

}
