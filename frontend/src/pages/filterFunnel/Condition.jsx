import styled from 'styled-components';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import ProgressBar from '../../components/common/ProgressBar';
import Button from '../../components/common/Button';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 60px 16px;
  display: flex;
  flex-direction: column;
  gap: 11px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const TitleBox = styled.div`
  width: 100%;
  font-size: 35px;
`;

const ContentTitle = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-size: 20px;
  font-weight: light;
`;

const ContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
`;

const InnerContentBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

// 앞에서 대분류 선택에 따라서 여기 subCategoryList가 달라져야 하는데 어떻게 하는지 잘 모르겠음...
function Description() {
  return (
    <Wrapper>
      <TitleBox>
        <Paragraph
          sentences={[
            <BoldText
              fontSize="35px"
              boldContent="집사의 조건"
              normalContent="을"
            ></BoldText>,
            '정해 주세요',
          ]}
        ></Paragraph>
      </TitleBox>

      {/* ProgressBar 진척도 변경 부분 */}
      <ProgressBar value={100}></ProgressBar>

      <ContentWrapper>
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
            <Button mode={'FULL_PERCENT_WHITE'} msg={'40대 미만'}></Button>
          </InnerContentBox>
          <InnerContentBox>
            <Button mode={'FULL_PERCENT_WHITE'} msg={'2'}></Button>
            <Button mode={'FULL_PERCENT_WHITE'} msg={'3'}></Button>
          </InnerContentBox>
          <InnerContentBox>
            <Button mode={'FULL_PERCENT_WHITE'} msg={'프로 집사'}></Button>
            <Button mode={'FULL_PERCENT_WHITE'} msg={'전설 집사'}></Button>
          </InnerContentBox>
        </ContentBox>

        <ContentBox>
          <ContentTitle>다이아몬드 평점</ContentTitle>
          <InnerContentBox>
            <Button mode={'INSIDE_IMAGE'} msg={'무관'}></Button>
            <Button mode={'INSIDE_IMAGE'} msg={'5 이상'}></Button>
            <Button mode={'INSIDE_IMAGE'} msg={'4 이상'}></Button>
          </InnerContentBox>
          <InnerContentBox>
            <Button mode={'INSIDE_IMAGE'} msg={'3 이상'}></Button>
            <Button mode={'INSIDE_IMAGE'} msg={'2 이상'}></Button>
            <Button mode={'INSIDE_IMAGE'} msg={'1 이상'}></Button>
          </InnerContentBox>
        </ContentBox>
      </ContentWrapper>
    </Wrapper>
  );
}

export default Description;
