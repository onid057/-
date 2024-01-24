import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

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

const TIME_HOURS = Array.from(Array(24).keys());
const TIME_MINUTES = Array(12)
  .fill(0)
  .map((num, i) => i * 5);

function TargetTime({ onPrevious, onNext, matchTime }) {
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
          <BoldText boldContent="시간" normalContent="을"></BoldText>,
          '정해주세요',
        ]}
      ></Paragraph>

      <ProgressBar value={68}></ProgressBar>
    </Wrapper>
  );
}

export default TargetTime;
