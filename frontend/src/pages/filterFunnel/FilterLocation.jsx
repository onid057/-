import styled from 'styled-components';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import ProgressBar from '../../components/common/ProgressBar';
import AddressInput from '../../components/common/AddressInput';
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
function FilterLocate() {
  return (
    <Wrapper>
      <TitleBox>
        <Paragraph
          sentences={[
            <BoldText
              fontSize="35px"
              BoldContent="약속 장소"
              NormalContent="를"
            ></BoldText>,
            '정해주세요',
          ]}
        ></Paragraph>
      </TitleBox>

      {/* ProgressBar 진척도 변경 부분 */}
      <ProgressBar value={68}></ProgressBar>

      <AddressInput></AddressInput>

      <LongInputBox
        title="세부 장소와 방법"
        placeholder="ex)&#10;아파트 정문에 있는 공원 정문에서 만나요. 저는 벤치에 앉아있을 테니 먼저 말을 걸어주세요."
      ></LongInputBox>
    </Wrapper>
  );
}

export default FilterLocate;
