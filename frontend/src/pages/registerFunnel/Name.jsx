import { useState, useEffect } from 'react';
import { styled } from 'styled-components';

import NavigationBar from '../../components/common/NavigationBar';
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
  const [name, setName] = useState('');

  useEffect(() => {
    if (userName) setName(userName);
  }, [userName]);

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
      ></NavigationBar>

      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText boldContent="이름" normalContent="을"></BoldText>,
          '입력해주세요',
        ]}
      ></Paragraph>

      <Input
        width="288px"
        margin="50px 0"
        commentText="이름은 4자 이상 입력할 수 없어요."
        placeholder="홍길동"
        onInput={event => {
          setName(event.target.value);
        }}
        data={userName}
      ></Input>
    </Wrapper>
  );
}

export default Name;
