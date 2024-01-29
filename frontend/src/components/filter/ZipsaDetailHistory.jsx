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
  font-size: 14px;
  font-weight: normal;
`;

const BoldText = styled.span`
  width: 130px;
  font-weight: bold;
`;

const NormalText = styled.div``;

const Horizon = styled.hr`
  width: 100%;
  height: 0.5px;
  background-color: #d2d2d2;
  border: 0;
`;

function ZipsaDetailHistory({
  replyAverage,
  serviceCount,
  kindnessAverage,
  skillAverage,
  rewindAverage,
}) {
  return (
    <Wrapper>
      <Title>평균 제안 응답 시간</Title>
      <TextBox>
        <BoldText>실시간 매칭</BoldText>
        <NormalText>{replyAverage}분</NormalText>
      </TextBox>

      <Horizon></Horizon>

      <Title>총 매칭 횟수</Title>
      <TextBox>
        <BoldText>총 이용 횟수</BoldText>
        <NormalText>{serviceCount}회</NormalText>
      </TextBox>

      <Horizon></Horizon>

      <Title>고객 만족도</Title>
      <TextBox>
        <BoldText>친절해요</BoldText>
        <NormalText>{kindnessAverage}점</NormalText>
      </TextBox>
      <TextBox>
        <BoldText>능숙해요</BoldText>
        <NormalText>{skillAverage}점</NormalText>
      </TextBox>
      <TextBox>
        <BoldText>다시 만나고 싶어요</BoldText>
        <NormalText>{rewindAverage}점</NormalText>
      </TextBox>
    </Wrapper>
  );
}

export default ZipsaDetailHistory;
