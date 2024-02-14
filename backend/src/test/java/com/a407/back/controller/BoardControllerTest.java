package com.a407.back.controller;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

import com.a407.back.BackendApplication;
import com.a407.back.domain.Board;
import com.a407.back.domain.Tag;
import com.a407.back.domain.User.Gender;
import com.a407.back.dto.board.BoardChangeRequest;
import com.a407.back.dto.board.BoardCreateRequest;
import com.a407.back.dto.board.BoardDetailResponse;
import com.a407.back.dto.board.BoardListRequest;
import com.a407.back.dto.board.BoardListResponse;
import com.a407.back.dto.comment.CommentCreateRequest;
import com.a407.back.dto.user.UserCreateRequest;
import com.a407.back.model.service.BoardService;
import com.a407.back.model.service.CommentService;
import com.a407.back.model.service.UserService;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

@SpringBootTest
@ContextConfiguration(classes = BackendApplication.class)
class BoardControllerTest {

    @Autowired
    BoardService boardService;

    @Autowired
    UserService userService;

    @Autowired
    CommentService commentService;

    @Autowired
    EntityManager em;

    private Long userId;

    private Tag firstTag;

    private Tag secondTag;

    @BeforeEach
    void setup() {
        userId = userService.makeUser(new UserCreateRequest("user@abc.com", "user", "user",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.MAN, "서울시", 36.5, 127.5));

        Tag tempFirstTag = Tag.builder().name("first").build();
        em.persist(tempFirstTag);
        firstTag = em.find(Tag.class, tempFirstTag.getTagId());

        Tag tempSecondTag = Tag.builder().name("second").build();
        em.persist(tempSecondTag);
        secondTag = em.find(Tag.class, tempSecondTag.getTagId());
    }

    @Test
    @Transactional
    @DisplayName("게시판 생성하기")
    void makeBoard() {
        List<Long> tagList = new ArrayList<>();
        tagList.add(firstTag.getTagId());
        Long boardId = boardService.makeBoard(userId, new BoardCreateRequest("title", "content", tagList));
        Board board = em.find(Board.class, boardId);

        assertThat(board.getUserId().getUserId(), is(equalTo(userId)));
        assertThat(board.getTitle(), is(equalTo("title")));
        assertThat(board.getContent(), is(equalTo("content")));
    }

    @Test
    @Transactional
    @DisplayName("게시판 목록 불러오기")
    void findBoardList() {
        List<Long> tagList = new ArrayList<>();
        tagList.add(firstTag.getTagId());
        boardService.makeBoard(userId, new BoardCreateRequest("title1", "content1", tagList));
        tagList.add(secondTag.getTagId());
        boardService.makeBoard(userId, new BoardCreateRequest("title2", "content2", tagList));

        int page = 1;
        int size = 2;

        BoardListResponse boardListResponse = boardService.findBoardList(new BoardListRequest(page, size, tagList));
        assertThat(boardListResponse.getBoardList().size(), is(equalTo(2)));

    }

    @Test
    @Transactional
    @DisplayName("게시판 상세조회")
    void findBoardDeatil() {
        List<Long> tagList = new ArrayList<>();
        tagList.add(firstTag.getTagId());
        Long boardId = boardService.makeBoard(userId, new BoardCreateRequest("title1", "content1", tagList));
        commentService.makeComment(userId, new CommentCreateRequest(boardId, "commentContent"));
        BoardDetailResponse boardDetailResponse = boardService.findBoardDetail(boardId, userId);

        assertThat(boardDetailResponse.getTitle(), is(equalTo("title1")));
        assertThat(boardDetailResponse.getContent(), is(equalTo("content1")));
        assertThat(boardDetailResponse.getCommentList().get(0).getContent(), is(equalTo("commentContent")));
    }

    @Test
    @Transactional
    @DisplayName("게시판 수정")
    void changeBoard() {
        List<Long> tagList = new ArrayList<>();
        tagList.add(firstTag.getTagId());
        Long boardId = boardService.makeBoard(userId, new BoardCreateRequest("title1", "content1", tagList));
        commentService.makeComment(userId, new CommentCreateRequest(boardId, "commentContent"));
        BoardDetailResponse boardDetailResponse = boardService.findBoardDetail(boardId, userId);

        assertThat(boardDetailResponse.getCommentList().size(), is(equalTo(1)));

        tagList.add(secondTag.getTagId());
        BoardChangeRequest boardChangeRequest = new BoardChangeRequest("", "newContent", tagList);
        boardService.changeBoard(boardId, boardChangeRequest);
        em.flush();
        em.clear();
        BoardDetailResponse newBoardDetailResponse = boardService.findBoardDetail(boardId, userId);

        assertThat(newBoardDetailResponse.getTitle(), is(equalTo("title1")));
        assertThat(newBoardDetailResponse.getContent(), is(equalTo("newContent")));
    }

    @Test
    @Transactional
    @DisplayName("게시판 삭제")
    void deleteBoard() {
        List<Long> tagList = new ArrayList<>();
        tagList.add(firstTag.getTagId());
        Long boardId = boardService.makeBoard(userId, new BoardCreateRequest("title1", "content1", tagList));
        BoardDetailResponse boardDetailResponse = boardService.findBoardDetail(boardId, userId);
        assertThat(boardDetailResponse.getContent(), is(equalTo("content1")));

        boardService.deleteBoard(boardId);
        boolean errorFlag = false;
        try {
            boardService.findBoardDetail(boardId, userId);
        } catch(RuntimeException ex) {
            errorFlag = true;
        }
        assertThat(errorFlag, is(equalTo(true)));
    }
}