import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavigationBar from '../components/common/NavigationBar';
import Image from '../components/common/Image';
import Paragraph from '../components/common/Paragraph';
import BoardsTags from '../components/boards/BoardsTags';

import { useNavigate } from 'react-router-dom';
import { calculateReportWritingTime } from '../utils/time';
import { getBoardListByUser } from '../apis/api/userMyPage';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const Article = styled.div`
  cursor: pointer;
  width: 100%;
  height: auto;
  padding: 20px 13px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 25px;
  background-color: white;
`;

const InsideTags = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
`;

const ArticleTitle = styled.div`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 400;
`;

const ArticleInfo = styled.div`
  font-size: 15px;
  font-weight: 300;
  text-align: end;
`;

const page = 1;
const size = 50;
const userId = 6;

function MyBoardList() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  const onPrevious = () => {
    navigate(-1);
  };

  useEffect(() => {
    getBoardListByUser(userId, page, size).then(resp => {
      setList(resp.boardList);
    });
  }, []);

  return (
    <Wrapper>
      <NavigationBar
        leftContent={
          <Image
            src={`${process.env.PUBLIC_URL}/images/keyboard_arrow_left.svg`}
            width={'40px'}
            height={'40px'}
            margin={'0 0 0 -12px'}
          ></Image>
        }
        onPrevious={onPrevious}
      ></NavigationBar>
      <Paragraph
        fontSize={'35px'}
        sentences={['내가', '작성한 게시글']}
        gap={'15px'}
      ></Paragraph>
      {/* API 받아서 map 돌기 */}
      {list?.map((article, idx) => (
        <Article
          key={idx}
          onClick={() => navigate(`/boards/${article.boardId}`)}
        >
          <InsideTags>
            {article.tagNameList.map((tag, idx) => (
              <BoardsTags key={idx} mode={'SMALL'} tagname={tag}></BoardsTags>
            ))}
          </InsideTags>
          <ArticleTitle>{article.title}</ArticleTitle>
          <ArticleInfo>
            {calculateReportWritingTime(article.updatedAt)} | 댓글{' '}
            {article.commentCount}
          </ArticleInfo>
        </Article>
      ))}
    </Wrapper>
  );
}

export default MyBoardList;
