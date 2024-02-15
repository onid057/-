import { useState } from 'react';
import { regPassword } from '../../utils/regularExpression';
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

function PassWord({ onPrevious, onNext }) {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

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
        rightContent="완료"
        onPrevious={onPrevious}
        onNext={() => onNext(password)}
        disabledOnNext={
          !password ||
          !confirmPassword ||
          password !== confirmPassword ||
          !regPassword.test(password)
        }
      ></NavigationBar>

      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText boldContent="비밀번호" normalContent="를"></BoldText>,
          '입력해주세요',
        ]}
      ></Paragraph>

      <ProgressBar value={100}></ProgressBar>

      <Input
        labelText="비밀번호 입력"
        type="password"
        width="288px"
        commentText="영문자, 숫자, 특수기호로 8자리어야 해요."
        placeholder="********"
        onInput={event => {
          setPassword(event.target.value);
        }}
      ></Input>

      <Input
        labelText="비밀번호 확인"
        type="password"
        width="288px"
        margin="20px 0 0 0"
        placeholder="********"
        onInput={event => {
          setConfirmPassword(event.target.value);
        }}
      ></Input>
    </Wrapper>
  );
}

export default PassWord;
