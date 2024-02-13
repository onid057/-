import { doLogIn } from '../../apis/api/login';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../hooks/useUserInfo';

import styled from 'styled-components';
import Paragraph from '../../components/common/Paragraph';
import BoldText from '../../components/common/BoldText';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import NavigateText from '../../components/common/NavigateText';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 30px 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const QuestionWrapper = styled.span`
  width: 288px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useUserInfo();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <Wrapper>
      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText boldContent="로그인" normalContent="을"></BoldText>,
          '해주세요',
        ]}
      ></Paragraph>

      <Input
        type="email"
        width="288px"
        margin="30px 0 20px 0"
        labelText="이메일"
        commentText="이메일 형식이 올바르지 않습니다."
        placeholder="hanzipsa@naver.com"
        onChange={event => setEmail(event.target.value)}
      ></Input>

      <Input
        type="password"
        width="288px"
        labelText="비밀번호"
        commentText="8자 이상이어야 합니다."
        placeholder="********"
        onChange={event => setPassword(event.target.value)}
      ></Input>

      <Button
        mode="THICK_BLUE"
        onClick={() => {
          doLogIn(email, password).then(response => {
            if (response) {
              setIsLoggedIn(true);
              navigate('/');
            }
          });
        }}
      >
        로그인
      </Button>

      <QuestionWrapper>
        <span>비밀번호를 잊으셨나요?</span>
        <NavigateText>비밀번호 찾기</NavigateText>
      </QuestionWrapper>

      <QuestionWrapper>
        <span>아직 회원이 아니신가요?</span>
        <NavigateText nextPage="/register">회원가입</NavigateText>
      </QuestionWrapper>
    </Wrapper>
  );
}

export default Login;
