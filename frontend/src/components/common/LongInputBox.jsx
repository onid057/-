import styled from 'styled-components';

const LongInputBoxWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
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
  font-weight: 300;
  background-color: transparent;
  outline: none;
  border: none;
  line-height: 1.3;
  overflow: hidden;
`;

function LongInputBox({ title, placeholder, value, onChange, defaultValue }) {
  // title: ${props => (props.$fontSize ? props.$fontSize : 'inherit')};

  return (
    <LongInputBoxWrapper>
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
        >
          {defaultValue}
        </TextAreaInput>
      </ContentBox>
    </LongInputBoxWrapper>
  );
}

export default LongInputBox;
