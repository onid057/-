package com.a407.back.model.repo;

import com.a407.back.domain.Board;
import com.a407.back.domain.BoardTag;
import com.a407.back.domain.QBoard;
import com.a407.back.domain.QBoardTag;
import com.a407.back.domain.Tag;
import com.a407.back.domain.User;
import com.a407.back.dto.util.BoardChangeDto;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class BoardRepositoryImpl implements BoardRepository {

    private final EntityManager em;

    private final JPAQueryFactory query;

    @Override
    public Long makeBoard(Board board) {
        em.persist(board);
        return board.getBoardId();
    }

    @Override
    public void makeBoardTag(BoardTag boardTag) {
        em.persist(boardTag);
    }

    @Override
    public Board findBoard(Long boardId) {
        return em.find(Board.class, boardId);
    }

    @Override
    public void changeBoard(BoardChangeDto boardChangeDto) {
        QBoard qBoard = QBoard.board;
        query.update(qBoard).set(qBoard.title, boardChangeDto.getTitle())
            .set(qBoard.content, boardChangeDto.getContent())
            .where(qBoard.boardId.eq(boardChangeDto.getBoardId())).execute();
    }

    @Override
    public List<BoardTag> findBoardTagList(Board board) {
        QBoardTag qBoardTag = QBoardTag.boardTag;
        return query.selectFrom(qBoardTag).where(qBoardTag.boardTagId.boardId.eq(board)).fetch();
    }

    @Override
    public void deleteBoardTag(Board board, Tag tag) {
        QBoardTag qBoardTag = QBoardTag.boardTag;
        query.delete(qBoardTag)
            .where(qBoardTag.boardTagId.boardId.eq(board).and(qBoardTag.boardTagId.tagId.eq(tag)))
            .execute();
    }

    @Override
    public void deleteBoardTagList(Board board) {
        QBoardTag qBoardTag = QBoardTag.boardTag;
        query.delete(qBoardTag).where(qBoardTag.boardTagId.boardId.eq(board)).execute();
    }

    @Override
    public void deleteBoard(Board board) {
        em.remove(board);
    }

    @Override
    public QueryResults<Board> findBoardList(int page, int size) {
        QBoard qBoard = QBoard.board;
        return query.selectFrom(qBoard).orderBy(qBoard.updatedAt.desc())
            .offset(page).limit(size).fetchResults();
    }

    @Override
    public QueryResults<Board> getUserBoardList(User user, int page, int size) {
        QBoard qBoard = QBoard.board;
        return query.selectFrom(qBoard).where(qBoard.userId.eq(user)).orderBy(qBoard.updatedAt.desc())
            .offset(page).limit(size).fetchResults();
    }

    @Override
    public Tag findTag(Long tagId) {
        return em.find(Tag.class, tagId);
    }
}
