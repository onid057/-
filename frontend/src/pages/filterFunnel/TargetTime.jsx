import { useState } from 'react';
import { styled } from 'styled-components';

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
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const TimeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function TargetTime({ onPrevious, onNext, matchStartTime, matchEndTime }) {
  const [startTime, setStartTime] = useState(matchStartTime || 0);
  const [endTime, setEndTime] = useState(matchEndTime || 24);

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
        onNext={() => onNext(startTime, endTime)}
        disabledOnNext={!startTime || !endTime}
      ></NavigationBar>

      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText boldContent="시간" normalContent="을"></BoldText>,
          '정해주세요',
        ]}
      ></Paragraph>

      <ProgressBar value={72}></ProgressBar>

      <TimeWrapper>
        <Input
          type="number"
          width="80px"
          step="1"
          min={0}
          max={24}
          value={startTime}
          placeholder={9}
          onChange={event => setStartTime(event.target.value)}
        ></Input>
        <>시부터</>
        <Input
          type="number"
          width="80px"
          step="1"
          min={0}
          max={24}
          value={endTime}
          placeholder={12}
          onChange={event => setEndTime(event.target.value)}
        ></Input>
        <>시까지</>
      </TimeWrapper>
    </Wrapper>
  );
}

export default TargetTime;
