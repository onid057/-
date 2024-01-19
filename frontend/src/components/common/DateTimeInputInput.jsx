import styled from 'styled-components';

const DateTimeWrapper = styled.div`
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
  height: 60px;
  padding: 0px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  font-weight: light;
  font-size: 20px;
  background-color: #ffffff;
  border-radius: 25px;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const LongInput = styled.input`
  width: 60px;
  height: 40px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  border: none;
  /* border-bottom: 2px solid rgb(0, 0, 0, 0.3); */
  &::placeholder {
    color: #d3d3d0;
  }
`;

const ShortInput = styled.input`
  width: 35px;
  height: 40px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  border: none;
  /* border-bottom: 2px solid rgb(0, 0, 0, 0.3); */
  &::placeholder {
    color: #d3d3d0;
  }
`;

const SmallerText = styled.span`
  font-weight: light;
  font-size: 16px;
  color: gray;
`;
function DateTimeInputInput() {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();

  return (
    <DateTimeWrapper>
      <InsideWrapper>
        <TitleBox>
          <span>날짜</span>
        </TitleBox>
        <ContentBox>
          <InnerContainer>
            <div>
              <LongInput type="number" placeholder={year}></LongInput>
              <span>년</span>
            </div>
            <div>
              <ShortInput type="number" placeholder={month}></ShortInput>
              <span>월</span>
            </div>
            <div>
              <ShortInput type="number" placeholder={date}></ShortInput>
              <span>일</span>
            </div>
          </InnerContainer>
        </ContentBox>
      </InsideWrapper>

      <InsideWrapper>
        <TitleBox>
          <span>시간</span>
        </TitleBox>
        <ContentBox>
          <InnerContainer>
            <ShortInput type="number" placeholder="00"></ShortInput>
            <span>시</span>
            <ShortInput type="number" placeholder="00"></ShortInput>
            <span>분</span>
          </InnerContainer>
          <SmallerText>부터</SmallerText>
        </ContentBox>
        <ContentBox>
          <div>
            <ShortInput type="number" placeholder="0"></ShortInput>
            <span>시간</span>
          </div>
          <SmallerText>동안</SmallerText>
        </ContentBox>
      </InsideWrapper>
    </DateTimeWrapper>
  );
}

export default DateTimeInputInput;
