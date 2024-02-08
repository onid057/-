import styled from 'styled-components';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import Paragraph from '../../components/common/Paragraph';
import Input from '../../components/common/Input';
import LongInputBox from '../../components/common/LongInputBox';
import BoardsTags from '../../components/boards/BoardsTags';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0px 16px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const ParagraphWrapper = styled.div`
  margin-bottom: 40px;
`;

const SubTitle = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-size: 20px;
  font-weight: light;
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

// 여기는 '전체' 선택지가 없어용
const allTags = [
  '맛집 추천',
  '동네 소식',
  '집사 후기',
  '모임 모집',
  '생활정보',
  '일상',
  '공공소식',
];
const tagLength = allTags.length;

// 이전 페이지에서 '게시판 상세 조회' 내용 prop 받기

function CreateBoard() {
  // 이전 페이지로부터 props 받기
  const location = useLocation();
  const title = location.state.title;
  const content = location.state.content;
  const updatedAt = location.state.updatedAt;
  const tagList = location.state.tagList;

  // useState로 변수 선언하기
  const [newTitle, setNewTitle] = useState(title);
  const [newcontent, setNewcontent] = useState(content);
  const [newupdatedAt, setNewupdatedAt] = useState(updatedAt);
  const [newtagList, setNewtagList] = useState(tagList);

  const onChangeTitle = e => {
    setNewTitle(e.target.value);
    console.log(newTitle);
  };

  // tagCheckList의 상태를 관리할 useState 함수
  const tagCheckList = Array.from({ length: tagLength }, () => false);
  const [isSelected, setIsSelected] = useState(tagCheckList);

  // 누르면 check값이 토글되는 함수
  const toggleSelected = idx => {
    setIsSelected(array => [
      ...array.slice(0, idx),
      !array[idx],
      ...array.slice(idx + 1),
    ]);
  };

  // 게시판 수정 API 호출

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
        rightContent="수정"
      ></NavigationBar>

      <ParagraphWrapper>
        <Paragraph
          gap="5px"
          fontSize="35px"
          sentences={['게시글 수정하기']}
        ></Paragraph>
      </ParagraphWrapper>

      <div>
        <SubTitle>제목</SubTitle>
        <Input
          onChange={() => onChangeTitle()}
          type={'text'}
          width={'100%'}
          maxlength={50}
          defaultValue={title}
        ></Input>
      </div>

      <SubTitle>태그</SubTitle>
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

      <LongInputBox
        title={'내용'}
        // placeholder={content}
        maxlength={300}
        defaultValue={content}
      ></LongInputBox>
    </Wrapper>
  );
}

export default CreateBoard;
