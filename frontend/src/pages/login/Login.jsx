import { doLogIn } from '../../apis/api/login';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../hooks/useUserInfo';
import { regEmail, regPassword } from '../../utils/regularExpression';
import styled from 'styled-components';
import Paragraph from '../../components/common/Paragraph';
import BoldText from '../../components/common/BoldText';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import NavigateText from '../../components/common/NavigateText';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px 20px;
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
      <NavigationBar
        leftContent={
          <Image
            width="40px"
            height="40px"
            margin="0 0 0 -12px"
            src={process.env.PUBLIC_URL + '/images/left_arrow.svg'}
          ></Image>
        }
        onPrevious={() => navigate('/')}
      ></NavigationBar>

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
        margin="30px 0 0 0"
        labelText="이메일"
        placeholder="hanzipsa@naver.com"
        onChange={event => {
          setEmail(event.target.value);
        }}
      ></Input>

      <Input
        type="password"
        width="288px"
        labelText="비밀번호"
        onChange={event => setPassword(event.target.value)}
      ></Input>

      <Button
        mode={
          regEmail.test(email) && regPassword.test(password)
            ? 'THICK_BLUE'
            : 'THICK_WHITE'
        }
        onClick={() => {
          if (regEmail.test(email) && regPassword.test(password)) {
            doLogIn(email, password).then(response => {
              if (response) {
                setIsLoggedIn(true);
                navigate('/');
              }
            });
          }
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
