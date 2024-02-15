import styled from 'styled-components';
import Image from '../../components/common/Image';
import Paragraph from '../../components/common/Paragraph';
import BoardsTags from '../../components/boards/BoardsTags';
import MenuBar from '../../components/common/MenuBar';

import { useState, useEffect } from 'react';
import { getAllArticles } from '../../apis/api/board';
import { useNavigate } from 'react-router-dom';
import { calculateReportWritingTime } from '../../utils/time';
import { useUserInfo } from '../../hooks/useUserInfo';

const Wrapper = styled.div`
  width: 320px;
  margin: 0 auto;
  padding: 25px 16px 0;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const HeadWrapper = styled.div`
  width: 100%;
  min-height: 509px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-weight: 300;
  white-space: pre-wrap;
`;

const TagWrapper = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-content: center;
  gap: 8px;
  overflow: scroll;
  /* background: #f0d9ff; */
  overflow: auto;
  white-space: nowrap;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const CreateNewBox = styled.div`
  cursor: pointer;
  width: 100%;
  height: 70px;
  margin: 10px 0;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 25px;
  background-color: white;
  font-size: 20px;
  font-weight: 300;
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

const allTags = [
  '맛집 추천',
  '동네 소식',
  '집사 후기',
  '동네 모임',
  '생활 꿀팁',
  '일상 공유',
];

const page = 1;
const size = 20;

function BoardsMain() {
  const navigate = useNavigate();
  const tagCheckList = [true, true, true, true, true, true];
  const [isSelected, setIsSelected] = useState(tagCheckList);
  const [list, setList] = useState([]);
  const userState = useUserInfo(state => state.userState);

  const tagListArray = [];
  isSelected.forEach((element, index) => {
    if (element) tagListArray.push(index + 1);
  });

  useEffect(() => {
    getAllArticles(page, size, tagListArray.join(',')).then(response => {
      console.log(response);
      setList(response.data.boardList);
    });
  }, [isSelected]);

  const toggleSelected = idx => {
    const nextState = [
      ...isSelected.slice(0, idx),
      !isSelected[idx],
      ...isSelected.slice(idx + 1),
    ];

    let isEveryElementEqualsFalse = true;
    nextState.forEach(element => {
      if (element) isEveryElementEqualsFalse = false;
    });

    setIsSelected(
      isEveryElementEqualsFalse
        ? Array.from({ length: 6 }, () => true)
        : nextState,
    );
  };

  return (
    <Wrapper>
      <HeadWrapper>
        <Paragraph gap="5px" fontSize="35px" sentences={['게시판']}></Paragraph>

        <CreateNewBox onClick={() => navigate(`/boards/create`)}>
          <Image
            src={process.env.PUBLIC_URL + '/images/pencil.svg'}
            width={'20px'}
            height={'20px'}
            margin={'0 -30px 0 0'}
          ></Image>
          <span>새 게시물 작성하기</span>
          <Image
            src={process.env.PUBLIC_URL + '/images/right_arrow.svg'}
            width={'24px'}
            height={'24px'}
            margin={'0'}
          ></Image>
        </CreateNewBox>

        <TagWrapper>
          {allTags.map((tag, idx) => (
            <BoardsTags
              key={idx}
              mode={isSelected[idx] ? 'LARGE_SELECTED' : 'LARGE'}
              tagname={tag}
              onClick={() => toggleSelected(idx)}
            ></BoardsTags>
          ))}
        </TagWrapper>

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
              {article.userName} |{' '}
              {calculateReportWritingTime(article.updatedAt)} | 댓글{' '}
              {article.commentCount}
            </ArticleInfo>
          </Article>
        ))}
      </HeadWrapper>
      <MenuBar currentMenu="POST" isWorked={userState === 'ZIPSA'}></MenuBar>
    </Wrapper>
  );
}

export default BoardsMain;
