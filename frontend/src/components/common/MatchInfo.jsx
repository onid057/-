import styled from 'styled-components';
import BoldText from './BoldText';
import Paragraph from './Paragraph';

const Wrapper = styled.div`
  width: 100%;
  padding: 22px 17px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #ffffff;
  border-radius: 25px;
  font-size: 14px;
`;

const TitleWrapper = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DetailWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

function MatchInfo({
  mode,
  userName,
  expectationStartedAt,
  expectationEndedAt,
  expectationPay,
  majorCategoryName,
  content,
}) {
  return (
    <Wrapper>
      {mode !== 'SUGGEST' && (
        <TitleWrapper>
          <Paragraph
            gap={'5px'}
            fontSize={'17px'}
            sentences={[
              <BoldText
                boldContent={userName}
                normalContent={' 고객님의'}
              ></BoldText>,
              <BoldText
                boldContent={majorCategoryName}
                normalContent={' 를 수행했어요'}
              ></BoldText>,
            ]}
          ></Paragraph>
        </TitleWrapper>
      )}

      <TextWrapper>
        <>{mode === 'SUGGEST' ? '맡긴 일' : '맡은 일'}</>
        <BoldText boldContent={'대분류'}></BoldText>
      </TextWrapper>
      <TextWrapper>
        <>날짜</>
        <BoldText boldContent={'2024.02.02'}></BoldText>
      </TextWrapper>
      <TextWrapper>
        <>{mode === 'SUGGEST' ? '예상 시작 시간' : '시작 시간'}</>
        <BoldText boldContent={expectationStartedAt}></BoldText>
      </TextWrapper>
      <TextWrapper>
        <>{mode === 'SUGGEST' ? '예상 종료 시간' : '종료 시간'}</>
        <BoldText boldContent={expectationEndedAt}></BoldText>
      </TextWrapper>
      <TextWrapper>
        <>{mode === 'SUGGEST' ? '받을 금액' : '받은 금액'}</>
        <BoldText boldContent={expectationPay}></BoldText>
      </TextWrapper>

      {mode === 'SUGGEST' && (
        <DetailWrapper>
          <>상세 내용</>
          <BoldText boldContent={content}></BoldText>
        </DetailWrapper>
      )}
    </Wrapper>
  );
}

export default MatchInfo;
