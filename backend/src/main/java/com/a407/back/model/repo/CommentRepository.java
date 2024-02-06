package com.a407.back.model.repo;

import com.a407.back.domain.Board;
import com.a407.back.domain.Comment;
import com.a407.back.dto.util.CommentChangeDto;
import java.util.List;

public interface CommentRepository {
    Long makeComment(Comment comment);

    Long getCommentCount(Board board);

    Comment findCommentByCommentId(Long commentId);

    void deleteComment(Comment comment);

    List<Comment> findCommentList(Board board);

    void changeComment(CommentChangeDto commentChangeDto);
}
