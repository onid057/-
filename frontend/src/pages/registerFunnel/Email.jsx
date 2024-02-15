import { useState } from 'react';
import { regEmail } from '../../utils/regularExpression';
import styled from 'styled-components';
import ProgressBar from '../../components/common/ProgressBar';
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

function Email({ onPrevious, onNext, userEmail }) {
  const [email, setEmail] = useState(userEmail);

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
        onNext={() => onNext(email)}
        disabledOnNext={!email || !regEmail.test(email)}
      ></NavigationBar>

      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText boldContent="이메일" normalContent="을"></BoldText>,
          '입력해주세요',
        ]}
      ></Paragraph>

      <ProgressBar value={80}></ProgressBar>

      <Input
        type="email"
        width="288px"
        commentText="이메일 형식에 맞춰 입력해주세요."
        placeholder="hanzipsa@naver.com"
        onInput={event => {
          setEmail(event.target.value);
        }}
        value={email}
      ></Input>
    </Wrapper>
  );
}

export default Email;
