package com.a407.back.model.service;

import com.a407.back.domain.Board;
import com.a407.back.domain.BoardTag;
import com.a407.back.domain.BoardTagId;
import com.a407.back.domain.Comment;
import com.a407.back.domain.Tag;
import com.a407.back.domain.User;
import com.a407.back.dto.board.BoardChangeRequest;
import com.a407.back.dto.board.BoardCreateRequest;
import com.a407.back.dto.board.BoardDetailResponse;
import com.a407.back.dto.board.BoardListResponse;
import com.a407.back.dto.util.BoardChangeDto;
import com.a407.back.dto.util.BoardListDto;
import com.a407.back.dto.util.CommentListDto;
import com.a407.back.model.repo.BoardRepository;
import com.a407.back.model.repo.CommentRepository;
import com.a407.back.model.repo.UserRepository;
import com.querydsl.core.QueryResults;
import jakarta.transaction.Transactional;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    public Long makeBoard(BoardCreateRequest boardCreateRequest) {
        User user = userRepository.findByUserId(boardCreateRequest.getUserId());
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
    public BoardListResponse findBoardList(int page, int size) {
        QueryResults<Board> totalBoardList = boardRepository.findBoardList((page - 1) * size, size);
        List<BoardListDto> boardList = totalBoardList.getResults().stream().map(board -> {
            // 게시판의 댓글 개수 계산하기
            int commentCount = commentRepository.getCommentCount(board).intValue();
            // 게시판의 태그 이름들 리스트로 변환하여 전송
            List<BoardTag> tagList = boardRepository.findBoardTagList(board);
            List<String> tagNameList = tagList.stream()
                .map(boardTag -> boardTag.getBoardTagId().tagId.getName()).toList();

            return new BoardListDto(board.getTitle(), board.getUserId().getName(), commentCount,
                board.getUpdatedAt(), tagNameList);
        }).toList();
        return new BoardListResponse(totalBoardList.getTotal(), page, boardList);
    }

    @Override
    public BoardDetailResponse findBoardDetail(Long boardId) {
        Board board = boardRepository.findBoard(boardId);
        User user = userRepository.findByUserId(board.getUserId().getUserId());
        List<CommentListDto> commentList = commentRepository.findCommentList(board).stream()
            .map(comment -> {
                return new CommentListDto(comment.getUserId().getName(), comment.getContent(),
                    comment.getUpdatedAt());
            }).toList();

        String profileImage = "";
        if(user.getProfileImage() != null) {
            Byte[] byteImage = user.getProfileImage();
            byte[] imageToByte = new byte[byteImage.length];

            int count = 0;
            for(Byte byteImagePiece : byteImage) {
                imageToByte[count++] = byteImagePiece;
            }

            profileImage = new String(imageToByte);
        }

        return new BoardDetailResponse(user.getName(), user.getAddress(), profileImage, board.getTitle(),
            board.getContent(), board.getUpdatedAt(), commentList);
    }
}
