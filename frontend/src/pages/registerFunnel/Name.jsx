import { useState } from 'react';
import { regName } from '../../utils/regularExpression';
import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import ProgressBar from '../../components/common/ProgressBar';
import Image from '../../components/common/Image';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
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

function Name({ onPrevious, onNext, userName }) {
  const [name, setName] = useState(userName);

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
        onNext={() => onNext(name)}
        disabledOnNext={!name || !regName.test(name)}
      ></NavigationBar>

      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText boldContent="이름" normalContent="을"></BoldText>,
          '입력해주세요',
        ]}
      ></Paragraph>

      <ProgressBar value={16}></ProgressBar>

      <Input
        width="288px"
        commentText="이름은 2~5자의 한글이어야 해요."
        placeholder="홍길동"
        onInput={event => {
          setName(event.target.value);
        }}
        value={name}
      ></Input>
    </Wrapper>
  );
}

export default Name;
