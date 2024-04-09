import { useState } from 'react';
import { styled } from 'styled-components';
import Calendar from 'react-calendar';
import '../../assets/styles/Calendar.css';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import ProgressBar from '../../components/common/ProgressBar';

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

function TargetDate({ onPrevious, onNext, matchDate }) {
  const [date, setDate] = useState(matchDate);

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
        onNext={() => onNext(new Date(date))}
        disabledOnNext={!date}
      ></NavigationBar>

      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText boldContent="날짜" normalContent="를"></BoldText>,
          '정해주세요',
        ]}
      ></Paragraph>

      <ProgressBar value={55}></ProgressBar>

      <Calendar
        value={date}
        onChange={setDate}
        view={'month'}
        minDate={new Date()}
        maxDate={new Date('2024-12-31')}
        next2Label={null}
        prev2Label={null}
        formatDay={(_, date) => date.toLocaleString('en', { day: 'numeric' })}
      ></Calendar>
    </Wrapper>
  );
}

export default TargetDate;
