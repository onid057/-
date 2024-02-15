import { useState } from 'react';
import { regEmail } from '../../utils/regularExpression';
import { checkIsNotDuplicatedEmail } from '../../apis/api/register';
import styled from 'styled-components';
import ProgressBar from '../../components/common/ProgressBar';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

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
const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

function Email({ onPrevious, onNext, userEmail }) {
  const [email, setEmail] = useState(userEmail || '');
  const [isValid, setIsValid] = useState(false);

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
        disabledOnNext={!email || !regEmail.test(email) || !isValid}
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

      <InputWrapper>
        <Input
          type="email"
          width="200px"
          margin="10px 0 0 0"
          commentText="이메일 형식에 맞춰 입력해주세요."
          placeholder="hanzipsa@ssafy.com"
          onChange={event => {
            if (isValid) setIsValid(false);
            setEmail(event.target.value);
          }}
          value={email}
        ></Input>
        <Button
          mode="THIN_WHITE"
          onClick={
            regEmail.test(email)
              ? function () {
                  checkIsNotDuplicatedEmail(email).then(response => {
                    if (response.data) {
                      alert('유효한 이메일입니다!');
                      setIsValid(true);
                    } else {
                      alert('중복하는 이메일입니다.');
                      setIsValid(false);
                    }
                  });
                }
              : undefined
          }
        >
          중복 확인
        </Button>
      </InputWrapper>
    </Wrapper>
  );
}

export default Email;
