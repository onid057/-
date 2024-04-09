import styled from 'styled-components';
import HorizontalLine from '../common/HorizontalLine';

const Wrapper = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 15px;
  font-weight: 300;
  font-size: 16px;
  background-color: #ffffff;
  border-radius: 25px;
`;

const Title = styled.div`
  width: 100%;
  height: 25px;
  font-size: 15px;
  font-weight: 400;
`;

const TextBox = styled.div`
  width: 100%;
  display: flex;
  font-size: 14px;
`;

const BoldText = styled.span`
  font-weight: 700;
  color: #629af9;
`;

const NormalText = styled.div`
  width: 130px;
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
      <BoldText>{replyAverage}분</BoldText>

      <HorizontalLine width={'100%'} height={'0.5px'}></HorizontalLine>

      <Title>총 매칭 횟수</Title>
      <BoldText>{serviceCount}회</BoldText>

      <HorizontalLine width={'100%'} height={'0.5px'}></HorizontalLine>

      <Title>고객 만족도</Title>
      <TextBox>
        <NormalText>친절해요</NormalText>
        <BoldText>{kindnessAverage}점</BoldText>
      </TextBox>
      <TextBox>
        <NormalText>능숙해요</NormalText>
        <BoldText>{skillAverage}점</BoldText>
      </TextBox>
      <TextBox>
        <NormalText>다시 만나고 싶어요</NormalText>
        <BoldText>{rewindAverage}점</BoldText>
      </TextBox>
    </Wrapper>
  );
}

export default ZipsaDetailHistory;
