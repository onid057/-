import styled from 'styled-components';

const LongInputBoxWrapper = styled.div`
  box-sizing: border-box;
  width: 90%;
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
  padding: 13px 15px 12px;
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

const ContentBoxInput = styled.input`
  width: 100%;
  height: auto;
  background-color: transparent;
  border: none;
  &::placeholder {
    opacity: 30%;
    font-weight: light;
    font-size: 16px;
  }
`;

function LongInputBox({}) {
  return (
    <LongInputBoxWrapper>
      <InsideWrapper>
        <TitleBox>title</TitleBox>
        <ContentBox>
          <ContentBoxInput
            type="text"
            placeholder="아파트 정문앞에서"
          ></ContentBoxInput>
        </ContentBox>
      </InsideWrapper>
    </LongInputBoxWrapper>
  );
}

export default LongInputBox;
