import styled from 'styled-components';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import ProgressBar from '../../components/common/ProgressBar';
import LongInputBox from '../../components/common/LongInputBox';

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

// 앞에서 대분류 선택에 따라서 여기 subCategoryList가 달라져야 하는데 어떻게 하는지 잘 모르겠음...
function Description() {
  return (
    <Wrapper>
      <TitleBox>
        <Paragraph
          sentences={[
            <BoldText
              fontSize="35px"
              boldContent="상세 내용"
              normalContent="을"
            ></BoldText>,
            '말씀해 주세요',
          ]}
        ></Paragraph>
      </TitleBox>

      {/* ProgressBar 진척도 변경 부분 */}
      <ProgressBar value={85}></ProgressBar>

      <LongInputBox
        title={'상세 내용'}
        placeholder={
          'OOO 미용실에 갈 거예요. 함께 갔다가 다시 정문까지 돌아와 주세요. 이야기도 나눠요.'
        }
      ></LongInputBox>
    </Wrapper>
  );
}

export default Description;
