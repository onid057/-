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

const TitleBox = styled.div`
  width: 100%;
  font-size: 35px;
`;

const ContentBox = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 15px;
`;

const InnerContentBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

function FilterMainCategory() {
  return (
    <Wrapper>
      <TitleBox>
        <Paragraph
          sentences={[
            <BoldText
              fontSize="35px"
              BoldContent="어떤 일"
              NormalContent="을"
            ></BoldText>,
            '맡기고 싶으신가요?',
          ]}
        ></Paragraph>
      </TitleBox>

      {/* ProgressBar 진척도 변경 부분 */}
      <ProgressBar value={17}></ProgressBar>

      <ContentBox>
        <InnerContentBox>
          <Button mode={'SMALL_WHITE'} msg={'동네 동행'}></Button>
          <Button mode={'SMALL_WHITE'} msg={'멀리 동행'}></Button>
        </InnerContentBox>
        <InnerContentBox>
          <Button mode={'SMALL_WHITE'} msg={'가사'}></Button>
          <Button mode={'SMALL_WHITE'} msg={'배달'}></Button>
        </InnerContentBox>
        <InnerContentBox>
          <Button mode={'SMALL_WHITE'} msg={'목욕'}></Button>
          <Button mode={'SMALL_WHITE'} msg={'펫 케어'}></Button>
        </InnerContentBox>
        <InnerContentBox>
          <Button mode={'SMALL_WHITE'} msg={'대행'}></Button>
          <Button mode={'SMALL_WHITE'} msg={'간단 심부름'}></Button>
        </InnerContentBox>
      </ContentBox>
    </Wrapper>
  );
}

export default FilterMainCategory;
