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
`;

// 앞에서 대분류 선택에 따라서 여기 subCategoryList가 달라져야 하는데 어떻게 하는지 잘 모르겠음...
function SubCategory() {
  const subCategoryList = [
    '산책하기',
    '함께 장보기',
    '함게 미용실가기',
    '함께 코딩하기',
    '함께 집에 가기',
    '함께 ...',
    '함께 ...',
    '함께 ...',
  ];

  return (
    <Wrapper>
      <TitleBox>
        <Paragraph
          sentences={[
            <BoldText
              fontSize="35px"
              boldContent="구체적으로 할 일"
              normalContent="을"
            ></BoldText>,
            '골라주세요',
          ]}
        ></Paragraph>
      </TitleBox>

      {/* ProgressBar 진척도 변경 부분 */}
      <ProgressBar value={34}></ProgressBar>

      <ContentBox>
        {/* '상관 없음'을 선택하면 모든 세부내용이 다 선택됨 */}
        <Button mode={'THIN_WHITE'} msg={'상관 없음'}></Button>
        {subCategoryList.map((sub, index) => {
          return <Button mode={'THIN_WHITE'} msg={sub}></Button>;
        })}
      </ContentBox>
    </Wrapper>
  );
}

export default SubCategory;
