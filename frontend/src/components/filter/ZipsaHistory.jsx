import styled from 'styled-components';

const Wrapper = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
  height: auto;
  padding: 28px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  font-weight: light;
  font-size: 16px;
  background-color: #ffffff;
  border-radius: 25px;
`;

const Title = styled.div`
  width: 100%;
  height: 25px;
  font-size: 16px;
  font-weight: normal;
`;

const TextBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  font-size: 12px;
  font-weight: normal;
`;

const BoldText = styled.span`
  width: 110px;
  font-weight: bold;
`;

const NormalText = styled.div``;

const Horizon = styled.hr`
  width: 100%;
  height: 0.5px;
  background-color: #d2d2d2;
  border: 0;
`;

function ZipsaHistory() {
  const reply_average = 15;
  const service_count = 18;
  const kindeness_average = 3.7;
  const skill_average = 3.3;
  const rewind_average = 4.1;

  return (
    <Wrapper>
      <Title>평균 제안 응답 시간</Title>
      <TextBox>
        <BoldText>실시간 매칭</BoldText>
        <NormalText>{reply_average}분</NormalText>
      </TextBox>

      <Horizon></Horizon>

      <Title>총 매칭 횟수</Title>
      <TextBox>
        <BoldText>총 이용 횟수</BoldText>
        <NormalText>{service_count}회</NormalText>
      </TextBox>

      <Horizon></Horizon>

      <Title>고객 만족도</Title>
      <TextBox>
        <BoldText>친절해요</BoldText>
        <NormalText>{kindeness_average}점</NormalText>
      </TextBox>
      <TextBox>
        <BoldText>능숙해요</BoldText>
        <NormalText>{skill_average}점</NormalText>
      </TextBox>
      <TextBox>
        <BoldText>다시 만나고 싶어요</BoldText>
        <NormalText>{rewind_average}점</NormalText>
      </TextBox>
    </Wrapper>
  );
}

export default ZipsaHistory;
