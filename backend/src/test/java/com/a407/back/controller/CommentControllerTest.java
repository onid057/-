package com.a407.back.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

import com.a407.back.BackendApplication;
import com.a407.back.domain.Board;
import com.a407.back.domain.Comment;
import com.a407.back.domain.Tag;
import com.a407.back.domain.User;
import com.a407.back.domain.User.Gender;
import com.a407.back.dto.board.BoardCreateRequest;
import com.a407.back.dto.comment.CommentChangeRequest;
import com.a407.back.dto.comment.CommentCreateRequest;
import com.a407.back.dto.user.UserCreateRequest;
import com.a407.back.model.service.BoardService;
import com.a407.back.model.service.CommentService;
import com.a407.back.model.service.UserService;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.joda.time.DateTime;
import org.joda.time.LocalDateTime;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

@SpringBootTest
@ContextConfiguration(classes = BackendApplication.class)
class CommentControllerTest {

    @Autowired
    UserService userService;

    @Autowired
    CommentService commentService;

    @Autowired
    BoardService boardService;

    @Autowired
    EntityManager em;

    private Long firstUserId;

    private Long secondUserId;

    private Long boardId;

    @BeforeEach
    void setup() {
        firstUserId = userService.makeUser(new UserCreateRequest("user@abc.com", "firstUser", "firstUser",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.MAN, "서울시", 36.4, 127.4));

        secondUserId = userService.makeUser(new UserCreateRequest("user@def.com", "secondUser", "secondUser",
            Date.valueOf(LocalDate.of(2024, 1, 1)), Gender.WOMAN, "서울시", 36.5, 127.5));

        Tag tag = Tag.builder().name("tag").build();
        em.persist(tag);
        Long tagId = tag.getTagId();
        List<Long> tagList = new ArrayList<>(List.of(new Long[]{tagId}));

        boardId = boardService.makeBoard(firstUserId, new BoardCreateRequest("title", "content", tagList));
    }

    @Test
    @Transactional
    @DisplayName("댓글 생성하기")
    void makeComment() {
        Long commentId = commentService.makeComment(secondUserId, new CommentCreateRequest(boardId, "newContent"));
        Comment comment = em.find(Comment.class, commentId);
        assertThat(comment.getContent(), is(equalTo("newContent")));
    }

    @Test
    @Transactional
    @DisplayName("댓글 수정하기")
    void changeComment() {
        Long commentId = commentService.makeComment(secondUserId, new CommentCreateRequest(boardId, "newContent"));
        Comment makeComment = em.find(Comment.class, commentId);
        assertThat(makeComment.getContent(), is(equalTo("newContent")));

        commentService.changeComment(commentId, new CommentChangeRequest("changeContent"));
        em.flush();
        em.clear();
        Comment newComment = em.find(Comment.class, commentId);
        assertThat(newComment.getContent(), is(equalTo("changeContent")));
    }

    @Test
    @Transactional
    @DisplayName("댓글 삭제하기")
    void deleteComment() {
        Long commentId = commentService.makeComment(secondUserId, new CommentCreateRequest(boardId, "newContent"));
        Comment comment = em.find(Comment.class, commentId);
        assertThat(comment.getContent(), is(equalTo("newContent")));

        commentService.deleteComment(commentId);
        em.flush();
        em.clear();
        Comment deleteComment = em.find(Comment.class, commentId);
        assertThat(deleteComment, is(equalTo(null)));
    }
}