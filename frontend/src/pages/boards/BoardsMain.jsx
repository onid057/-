import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import Paragraph from '../../components/common/Paragraph';
import BoardsTags from '../../components/boards/BoardsTags';
import { useState } from 'react';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0px 16px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-weight: 300;
  white-space: pre-wrap;
`;

// 가로스크롤 구현 위한 div
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
  margin-bottom: 20px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 25px;
  background-color: white;
  font-size: 20px;
  font-weight: 300;
`;

const SelectedTag = styled.div`
  width: 100%;
  height: auto;
  white-space: pre-wrap;
  font-size: 16px;
  font-weight: 400;
  color: #3f3f3f;
`;

const Article = styled.div`
  cursor: pointer;
  width: 100%;
  height: auto;
  padding: 20px 13px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-radius: 25px;
  background-color: white;
`;

const InsideTags = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
`;

const ArticleTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const ArticleText = styled.div`
  font-size: 15px;
  font-weight: 300;
  text-align: end;
`;

// 전체 리스트 조회 API
// API 나오면 더 봐야 할듯여

// 게시판 태그 목록과 길이
const allTags = [
  '전체',
  '맛집 추천',
  '동네 소식',
  '집사 후기',
  '모임 모집',
  '생활정보',
  '일상',
  '공공소식',
];
const tagLength = allTags.length;

function BoardsMain() {
  // useState 사용 위해 게시판 태그 길이만큼 빈 리스트 만들기
  const tagCheckList = Array.from({ length: tagLength }, () => false);

  // tagCheckList의 상태를 관리할 useState 함수
  const [isSelected, setIsSelected] = useState(tagCheckList);

  // 누르면 check값이 토글되는 함수
  const toggleSelected = idx => {
    if (idx === 0 && isSelected[0] === false) {
      setIsSelected(Array.from({ length: tagLength }, () => true));
    } else if (idx === 0 && isSelected[0] === true) {
      setIsSelected(Array.from({ length: tagLength }, () => false));
    } else {
      setIsSelected(array => [
        ...array.slice(0, idx),
        !array[idx],
        ...array.slice(idx + 1),
      ]);
    }
  };

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
      ></NavigationBar>

      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={['한집사 게시판']}
      ></Paragraph>

      <CreateNewBox>
        <Image
          src={process.env.PUBLIC_URL + '/images/pencil.svg'}
          width={'40px'}
          height={'40px'}
          margin={'0 -40px 0 0'}
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

      {/* 태그가 선택되면 나오는 div */}
      <SelectedTag>
        {isSelected[0] ? <span># 전체 </span> : ''}
        {allTags.map((tag, idx) =>
          !isSelected[0] && isSelected[idx] ? <span>#{tag} </span> : '',
        )}
      </SelectedTag>

      {/* API 받아서 map 돌기 */}
      <Article>
        <InsideTags>
          <BoardsTags mode={'SMALL'} tagname={'집사 후기'}></BoardsTags>
          <BoardsTags mode={'SMALL'} tagname={'동네 소식'}></BoardsTags>
          <BoardsTags mode={'SMALL'} tagname={'집사 추천'}></BoardsTags>
        </InsideTags>
        <ArticleTitle>이 서비스 진짜 짱이예요~!</ArticleTitle>
        <ArticleText>김세리 1일전 조회수</ArticleText>
      </Article>

      <Article>
        <InsideTags>
          <BoardsTags mode={'SMALL'} tagname={'모임 모집'}></BoardsTags>
          <BoardsTags mode={'SMALL'} tagname={'생활정보'}></BoardsTags>
        </InsideTags>
        <ArticleTitle>이 서비스 진짜 짱이예요~!</ArticleTitle>
        <ArticleText>김세리 1일전 조회수</ArticleText>
      </Article>

      <Article>
        <InsideTags>
          <BoardsTags mode={'SMALL'} tagname={'일상'}></BoardsTags>
          <BoardsTags mode={'SMALL'} tagname={'공공소식'}></BoardsTags>
        </InsideTags>
        <ArticleTitle>이 서비스 진짜 짱이예요~!</ArticleTitle>
        <ArticleText>김세리 1일전 조회수</ArticleText>
      </Article>
    </Wrapper>
  );
}

export default BoardsMain;
