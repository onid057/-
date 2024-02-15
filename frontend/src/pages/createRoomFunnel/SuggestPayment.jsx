import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import ProgressBar from '../../components/common/ProgressBar';
import Input from '../../components/common/Input';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const PaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 288px;
  height: 100px;
  gap: 10px;
`;

const TotalCost = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  padding: 0 0 10px;
  font-size: 18px;
  border-bottom: 2px solid rgb(0, 0, 0, 0.3);
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  color: ${props => props.$color};
`;

function SuggestPayment({
  onPrevious,
  onNext,
  matchServiceTime,
  matchPayment,
}) {
  const [unitPayment, setUnitPayment] = useState('');
  const [totalPayment, setTotalPayment] = useState(matchPayment || '');

  useEffect(() => {
    if (unitPayment !== '' && !isNaN(unitPayment)) {
      const total = unitPayment * matchServiceTime;
      setTotalPayment(total);
    }
  }, [unitPayment, matchServiceTime]);

  return (
    <Wrapper>
      <NavigationBar
        leftContent={
          <Image
            width="40px"
            height="40px"
            margin="0 0 0 -12px"
            src={process.env.PUBLIC_URL + '/images/left_arrow.svg'}
          ></Image>
        }
        rightContent="다음"
        onPrevious={onPrevious}
        onNext={() => onNext(totalPayment)}
        disabledOnNext={!unitPayment}
      ></NavigationBar>

      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText boldContent="금액" normalContent="을"></BoldText>,
          '제시해주세요',
        ]}
      ></Paragraph>

      <ProgressBar value={100}></ProgressBar>

      <PaymentWrapper>
        <TextWrapper>
          시간 당
          <Input
            type="number"
            width="100px"
            step="1000"
            min={0}
            value={unitPayment}
            onChange={event => {
              setUnitPayment(event.target.value);
            }}
          ></Input>
          원
        </TextWrapper>
        <TextWrapper>
          <BoldText
            boldContent={matchServiceTime}
            normalContent=" 시간"
          ></BoldText>
        </TextWrapper>
      </PaymentWrapper>

      <TotalCost>
        <TextWrapper>총금액</TextWrapper>
        <BoldText boldContent={totalPayment}></BoldText>
        <TextWrapper $color="rgba(156, 86, 86, 0.3)">원</TextWrapper>
      </TotalCost>
    </Wrapper>
  );
}

export default SuggestPayment;
