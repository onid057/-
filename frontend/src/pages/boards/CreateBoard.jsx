import styled from 'styled-components';
import { useState } from 'react';
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

function CreateBoard() {
  // useState 사용 위해 게시판 태그 길이만큼 빈 리스트 만들기
  const tagCheckList = Array.from({ length: tagLength }, () => false);

  // tagCheckList의 상태를 관리할 useState 함수
  const [isSelected, setIsSelected] = useState(tagCheckList);

  // 누르면 check값이 토글되는 함수
  const toggleSelected = idx => {
    setIsSelected(array => [
      ...array.slice(0, idx),
      !array[idx],
      ...array.slice(idx + 1),
    ]);
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
        rightContent="등록"
      ></NavigationBar>

      <ParagraphWrapper>
        <Paragraph
          gap="5px"
          fontSize="35px"
          sentences={['새 게시물 작성하기']}
        ></Paragraph>
      </ParagraphWrapper>

      <div>
        <SubTitle>제목</SubTitle>
        <Input
          type={'text'}
          width={'100%'}
          maxlength={50}
          placeholder={'제목을 입력해 주세요'}
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
        placeholder={'내용을 입력해 주세요'}
        maxlength={300}
      ></LongInputBox>
    </Wrapper>
  );
}

export default CreateBoard;
