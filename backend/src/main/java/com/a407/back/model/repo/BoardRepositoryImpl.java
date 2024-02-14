package com.a407.back.model.repo;

import com.a407.back.domain.Board;
import com.a407.back.domain.BoardTag;
import com.a407.back.domain.QBoard;
import com.a407.back.domain.QBoardTag;
import com.a407.back.domain.QTag;
import com.a407.back.domain.Tag;
import com.a407.back.domain.User;
import com.a407.back.dto.util.BoardChangeDto;
import com.querydsl.core.types.dsl.BooleanExpression;
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
    public List<BoardTag> findBoardList(int page, int size, List<Long> tagList) {
        QBoard qBoard = QBoard.board;
        QBoardTag qBoardTag = QBoardTag.boardTag;
        QTag qTag = QTag.tag;
        return query.selectFrom(qBoardTag).join(qBoardTag.boardTagId.boardId, qBoard)
            .join(qBoardTag.boardTagId.tagId, qTag)
            .where(tagEq(tagList)).orderBy(qBoard.updatedAt.desc()).offset(page)
            .limit(size).fetch();
    }

    @Override
    public List<Board> getUserBoardList(User user, int page, int size) {
        QBoard qBoard = QBoard.board;
        return query.selectFrom(qBoard).where(qBoard.userId.eq(user))
            .orderBy(qBoard.updatedAt.desc())
            .offset(page).limit(size).fetch();
    }

    @Override
    public Tag findTag(Long tagId) {
        return em.find(Tag.class, tagId);
    }

    private BooleanExpression tagEq(List<Long> tagList) {
        QTag qTag = QTag.tag;
        return tagList != null ? qTag.tagId.in(tagList) : null;
    }

}
