import styled from 'styled-components';

const LongInputBoxWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const InsideWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 21px;
`;

const TitleBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-size: 20px;
  font-weight: light;
`;

const ContentBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: auto;
  padding: 15px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-weight: light;
  font-size: 18px;
  color: gray;
  background-color: #ffffff;
  border-radius: 25px;
`;

const TextAreaInput = styled.textarea`
  min-width: 100%;
  min-height: 160px;
  padding: 3px;
  font-size: 18px;
  font-weight: light;
  background-color: transparent;
  outline: none;
  border: none;
  line-height: 1.3;
  overflow: hidden;
`;

function LongInputBox({ title, placeholder, value, onChange }) {
  // title: ${props => (props.$fontSize ? props.$fontSize : 'inherit')};

  return (
    <LongInputBoxWrapper>
      <InsideWrapper>
        {/* 여기에 상세 input의 제목을 입력합니다 */}
        {title && <TitleBox>{title}</TitleBox>}
        <ContentBox>
          <TextAreaInput
            // 여기에 placeholder를 입력합니다(개행문자 &#10; 사용하기)
            // "ex)&#10;아파트 정문에 있는 공원 정문에서 만나요. 저는 벤치에 앉아있을 테니 먼저 말을 걸어주세요."
            placeholder={placeholder}
            type="text"
            value={value}
            onChange={onChange}
          ></TextAreaInput>
        </ContentBox>
      </InsideWrapper>
    </LongInputBoxWrapper>
  );
}

// LongInputBox.defaultProps = {
//   title: '제목 prop으로 변경하기',
//   placeholder: '미리보기 prop으로 변경하기',
// };

export default LongInputBox;
