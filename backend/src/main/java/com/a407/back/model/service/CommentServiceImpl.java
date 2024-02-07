package com.a407.back.model.service;

import com.a407.back.domain.Board;
import com.a407.back.domain.Comment;
import com.a407.back.domain.User;
import com.a407.back.dto.comment.CommentChangeRequest;
import com.a407.back.dto.comment.CommentCreateRequest;
import com.a407.back.dto.util.CommentChangeDto;
import com.a407.back.model.repo.BoardRepository;
import com.a407.back.model.repo.CommentRepository;
import com.a407.back.model.repo.UserRepository;
import jakarta.transaction.Transactional;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    private final BoardRepository boardRepository;

    private final UserRepository userRepository;

    @Override
    @Transactional
    public Long makeComment(CommentCreateRequest commentCreateRequest) {
        Board board = boardRepository.findBoard(commentCreateRequest.getBoardId());
        User user = userRepository.findByUserId(commentCreateRequest.getUserId());
        Comment comment = Comment.builder().boardId(board).userId(user)
            .content(commentCreateRequest.getContent()).updatedAt(
                Timestamp.valueOf(LocalDateTime.now())).build();
        return commentRepository.makeComment(comment);
    }

    @Override
    @Transactional
    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findCommentByCommentId(commentId);
        commentRepository.deleteComment(comment);
    }

    @Override
    @Transactional
    public void changeComment(Long commentId, CommentChangeRequest commentChangeRequest) {
        Comment comment = commentRepository.findCommentByCommentId(commentId);
        String content = comment.getContent();
        if (commentChangeRequest.getContent() != null && !commentChangeRequest.getContent().isEmpty()) {
            content = commentChangeRequest.getContent();
        }
        CommentChangeDto commentChangeDto = new CommentChangeDto(commentId, content, Timestamp.valueOf(LocalDateTime.now()));
        commentRepository.changeComment(commentChangeDto);
    }
}
