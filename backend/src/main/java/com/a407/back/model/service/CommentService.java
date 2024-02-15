package com.a407.back.model.service;

import com.a407.back.dto.comment.CommentChangeRequest;
import com.a407.back.dto.comment.CommentCreateRequest;

public interface CommentService {

    Long makeComment(Long userId, CommentCreateRequest commentCreateRequest);

    void deleteComment(Long commentId);

    void changeComment(Long commentId, CommentChangeRequest commentChangeRequest);

}
