import React, { useState } from 'react';
import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import Paragraph from '../../components/common/Paragraph';
import Input from '../../components/common/Input';
import { useNavigate } from 'react-router-dom';
import { updateUserInfo } from '../../apis/api/userMyPage';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

function PasswordUpdate() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = e => {
    setPassword(e.target.value);
  };
  const handleChangeConfirmPassword = e => {
    setConfirmPassword(e.target.value);
  };

  const navigate = useNavigate();

  const onClickUpdateButton = () => {
    updateUserInfo(null, { password }).then(navigate('/userMyPage'));
  };

  return (
    <Wrapper>
      <NavigationBar
        leftContent={
          <Image
            src={`${process.env.PUBLIC_URL}/images/keyboard_arrow_left.svg`}
            width={'40px'}
            height={'40px'}
            margin={'0 0 0 -12px'}
          ></Image>
        }
        rightContent={'완료'}
        onPrevious={() => navigate(-1)}
        onNext={onClickUpdateButton}
        disabledOnNext={
          (!password && !confirmPassword) || password !== confirmPassword
        }
      ></NavigationBar>
      <Paragraph
        fontSize={'35px'}
        sentences={['비밀번호를', '변경하시겠어요?']}
        gap={'15px'}
      ></Paragraph>
      <Input
        type={'password'}
        width={'288px'}
        labelText={'새로운 비밀번호 입력'}
        value={password}
        onChange={handleChangePassword}
      ></Input>
      <Input
        type={'password'}
        width={'288px'}
        labelText={'새로운 비밀번호 확인'}
        value={confirmPassword}
        onChange={handleChangeConfirmPassword}
      ></Input>
    </Wrapper>
  );
}

export default PasswordUpdate;
