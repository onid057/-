import { styled } from 'styled-components';

import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import ProgressBar from '../../components/common/ProgressBar';
import Button from '../../components/common/Button';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const ContentTitle = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-size: 16px;
`;

const ContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const InnerContentBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

// 앞에서 대분류 선택에 따라서 여기 subCategoryList가 달라져야 하는데 어떻게 하는지 잘 모르겠음...
function Condition({ onPrevious, onNext }) {
  return (
    <Wrapper>
      <NavigationBar
        leftContent={
          <Image
            width="40px"
            height="40px"
            margin="0 0 0 -12px"
            src={process.env.PUBLIC_URL + '/images/left_arrow.svg'}
          ></Image>
        }
        rightContent="완료"
        onPrevious={onPrevious}
        onNext={onNext}
      ></NavigationBar>

      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText boldContent="집사의 조건" normalContent="을"></BoldText>,
          '정해 주세요',
        ]}
      ></Paragraph>

      {/* ProgressBar 진척도 변경 부분 */}
      <ProgressBar value={100}></ProgressBar>

      <ContentBox>
        <ContentTitle>성별</ContentTitle>
        <InnerContentBox>
          <Button mode={'FULL_PERCENT_WHITE'} msg={'무관'}></Button>
          <Button mode={'FULL_PERCENT_WHITE'} msg={'남성'}></Button>
          <Button mode={'FULL_PERCENT_WHITE'} msg={'여성'}></Button>
        </InnerContentBox>
      </ContentBox>

      <ContentBox>
        <ContentTitle>연령</ContentTitle>
        <InnerContentBox>
          <Button mode={'FULL_PERCENT_WHITE'} msg={'무관'}></Button>
          <Button mode={'FULL_PERCENT_WHITE'} msg={'40대 미만'}></Button>
          <Button mode={'FULL_PERCENT_WHITE'} msg={'40대 이상'}></Button>
        </InnerContentBox>
      </ContentBox>

      <ContentBox>
        <ContentTitle>집사 등급</ContentTitle>
        <InnerContentBox>
          <Button mode={'FULL_PERCENT_WHITE'} msg={'무관'}></Button>
          <Button mode={'FULL_PERCENT_WHITE'} msg={'견습 집사'}></Button>
        </InnerContentBox>
        <InnerContentBox>
          <Button mode={'FULL_PERCENT_WHITE'} msg={'프로 집사'}></Button>
          <Button mode={'FULL_PERCENT_WHITE'} msg={'전설 집사'}></Button>
        </InnerContentBox>
      </ContentBox>

      <ContentBox>
        <ContentTitle>다이아몬드 평점</ContentTitle>
        <InnerContentBox>
          <Button mode={'INSIDE_IMAGE'} msg={'5 이상'}></Button>
          <Button mode={'INSIDE_IMAGE'} msg={'4 이상'}></Button>
        </InnerContentBox>
        <InnerContentBox>
          <Button mode={'INSIDE_IMAGE'} msg={'3 이상'}></Button>
          <Button mode={'INSIDE_IMAGE'} msg={'2 이상'}></Button>
        </InnerContentBox>
        <InnerContentBox>
          <Button mode={'INSIDE_IMAGE'} msg={'1 이상'}></Button>
          <Button mode={'INSIDE_IMAGE'} msg={'0 이상'}></Button>
        </InnerContentBox>
      </ContentBox>
    </Wrapper>
  );
}

export default Condition;
