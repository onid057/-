package com.a407.back.model.repo;

import com.a407.back.domain.Board;
import com.a407.back.domain.Comment;
import com.a407.back.domain.QComment;
import com.a407.back.dto.util.CommentChangeDto;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CommentRepositoryImpl implements CommentRepository {

    private final EntityManager em;

    private final JPAQueryFactory query;

    @Override
    public Long makeComment(Comment comment) {
        em.persist(comment);
        return comment.getCommentId();
    }

    @Override
    public Long getCommentCount(Board board) {
        QComment qComment = QComment.comment;
        return query.select(qComment.count()).from(qComment).where(qComment.boardId.eq(board))
            .fetchFirst();
    }

    @Override
    public Comment findCommentByCommentId(Long commentId) {
        return em.find(Comment.class, commentId);
    }

    @Override
    public void deleteComment(Comment comment) {
        em.remove(comment);
    }

    @Override
    public List<Comment> findCommentList(Board board) {
        QComment qComment = QComment.comment;
        return query.selectFrom(qComment).where(qComment.boardId.eq(board)).fetch();
    }

    @Override
    public void changeComment(CommentChangeDto commentChangeDto) {
        QComment qComment = QComment.comment;
        query.update(qComment).set(qComment.content, commentChangeDto.getContent())
            .set(qComment.updatedAt, commentChangeDto.getUpdatedAt())
            .where(qComment.commentId.eq(commentChangeDto.getCommentId())).execute();
    }

}
