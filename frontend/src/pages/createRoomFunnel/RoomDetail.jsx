import { useState } from 'react';
import { styled } from 'styled-components';

import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import ProgressBar from '../../components/common/ProgressBar';
import Input from '../../components/common/Input';
import LongInputBox from '../../components/common/LongInputBox';

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

function RoomDetail({ onPrevious, onNext, matchTitle, matchContent }) {
  const [title, setTitle] = useState(matchTitle || '');
  const [content, setContent] = useState(matchContent || '');

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
        onNext={() => onNext(title, content)}
      ></NavigationBar>

      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText
            boldContent="구체적으로 할 일"
            normalContent="을"
          ></BoldText>,
          '설명해주세요',
        ]}
      ></Paragraph>

      <ProgressBar value={20}></ProgressBar>
      <Input
        type={'text'}
        width={'100%'}
        labelText={'방 제목'}
        placeholder={'ex. 강아지 대신 산책시켜 주실 분'}
        value={title}
        onChange={event => setTitle(event.target.value)}
      ></Input>
      <LongInputBox
        title={'세부 내용'}
        value={content}
        onChange={event => setContent(event.target.value)}
      ></LongInputBox>
    </Wrapper>
  );
}

export default RoomDetail;
