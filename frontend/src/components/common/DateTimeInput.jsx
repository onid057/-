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
  margin-bottom: 21px;
`;

const TitleBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 7px;
  display: flex;
  justify-content: flex-start;
  font-size: 20px;
  font-weight: light;
`;

const ContainBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 25px;
`;

const LongInput = styled.input`
  width: 70px;
  height: 40px;
  font-size: 20px;
  font-weight: bold;
`;

const ShortInput = styled.input`
  width: 35px;
  height: 40px;
  font-size: 20px;
  font-weight: bold;
`;

function DateTimeInput() {
  return (
    <DateTimeWrapper>
      <InsideWrapper>
        <TitleBox>
          <span>날짜</span>
        </TitleBox>
        <ContainBox>
          <LongInput type="number" placeholder="년"></LongInput>
          <span>년</span>
          <ShortInput type="number" placeholder="년"></ShortInput>
          <span>월</span>
          <ShortInput type="number" placeholder="년"></ShortInput>
          <span>일</span>
        </ContainBox>
      </InsideWrapper>

      <InsideWrapper>
        <TitleBox>
          <span>시간</span>
        </TitleBox>
        <ContainBox></ContainBox>
      </InsideWrapper>
    </DateTimeWrapper>
  );
}

export default DateTimeInput;
