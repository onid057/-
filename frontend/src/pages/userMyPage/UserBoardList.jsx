import { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import Paragraph from '../../components/common/Paragraph';
import BoardsTags from '../../components/boards/BoardsTags';
import NavigateText from '../../components/common/NavigateText';
import { useNavigate } from 'react-router-dom';
import { calculateReportWritingTime } from '../../utils/time';
import { getBoardListByUser } from '../../apis/api/userMyPage';

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

const NoInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 35px 0 0;
  gap: 50px;
`;

const page = 1;
const size = 50;

function UserBoardList() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  const onPrevious = () => {
    navigate(-1);
  };

  useEffect(() => {
    getBoardListByUser(page, size).then(resp => {
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
        fontSize={'34px'}
        sentences={['내가 작성한 게시글']}
        gap={'15px'}
      ></Paragraph>
      {list.length === 0 && (
        <NoInfoWrapper>
          <Paragraph
            fontSize={'20px'}
            sentences={['작성한 게시글이 없어요']}
            gap={'7px'}
          ></Paragraph>
          <Paragraph
            fontSize={'20px'}
            sentences={['동네 사람들과 다양한', '이야기를 주고 받아보세요!']}
            gap={'7px'}
          ></Paragraph>
          <NavigateText
            nextPage={'/boards'}
            children={'게시판 가기'}
          ></NavigateText>
        </NoInfoWrapper>
      )}

      {/* API 받아서 map 돌기 */}
      {!list && <>hi</>}
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

export default UserBoardList;
