package com.a407.back.model.repo;

import com.a407.back.domain.Board;
import com.a407.back.domain.BoardTag;
import com.a407.back.domain.Tag;
import com.a407.back.domain.User;
import com.a407.back.dto.util.BoardChangeDto;
import com.querydsl.core.QueryResults;
import java.util.List;

public interface BoardRepository {

    Long makeBoard(Board board);

    void makeBoardTag(BoardTag boardTag);

    Tag findTag(Long tagId);

    Board findBoard(Long boardId);

    void changeBoard(BoardChangeDto boardChangeDto);

    List<BoardTag> findBoardTagList(Board board);

    void deleteBoardTag(Board board, Tag tag);

    void deleteBoardTagList(Board board);

    void deleteBoard(Board board);

    List<BoardTag> findBoardList(int page, int size, List<Long> tagList);

    List<Board> getUserBoardList(User user, int page, int size);
}
