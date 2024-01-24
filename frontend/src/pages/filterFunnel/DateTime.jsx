import { styled } from 'styled-components';
import Calendar from 'react-calendar';
import '../../assets/styles/Calendar.css';

import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import ProgressBar from '../../components/common/ProgressBar';
import DateTimeInputSelect from '../../components/common/DateTimeInputSelect';
import Button from '../../components/common/Button';

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

const ContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
`;

// 앞에서 대분류 선택에 따라서 여기 subCategoryList가 달라져야 하는데 어떻게 하는지 잘 모르겠음...
function DateTime({ onPrevious, onNext }) {
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
        onNext={onNext}
      ></NavigationBar>

      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText boldContent="날짜와 시간" normalContent="을"></BoldText>,
          '정해주세요',
        ]}
      ></Paragraph>

      {/* ProgressBar 진척도 변경 부분 */}
      <ProgressBar value={51}></ProgressBar>

      {/* <DateTimeInputSelect></DateTimeInputSelect> */}
      <Calendar
        view={'month'}
        minDate={new Date()}
        next2Label={null}
        prev2Label={null}
        formatDay={(locale, date) =>
          date.toLocaleString('en', { day: 'numeric' })
        }
      ></Calendar>
    </Wrapper>
  );
}

export default DateTime;
