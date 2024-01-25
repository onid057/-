import { styled } from 'styled-components';

import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import ProgressBar from '../../components/common/ProgressBar';
import LongInputBox from '../../components/common/LongInputBox';

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

function Description({ onPrevious, onNext }) {
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
          <BoldText boldContent="상세 내용" normalContent="을"></BoldText>,
          '적어주세요',
        ]}
      ></Paragraph>

      <ProgressBar value={85}></ProgressBar>

      <LongInputBox
        placeholder={
          '미용실에 갈 건데 함께 갔다가 다시 정문까지 돌아와 주세요. 이야기도 나눠요!'
        }
      ></LongInputBox>
    </Wrapper>
  );
}

export default Description;
