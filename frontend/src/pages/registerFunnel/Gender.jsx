import { useState } from 'react';
import { styled } from 'styled-components';

import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import Paragraph from '../../components/common/Paragraph';
import BoldText from '../../components/common/BoldText';
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

const ButtonWrapper = styled.div`
  margin: 60px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function Gender({ onPrevious, onNext }) {
  const [gender, setGender] = useState('');

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
        onNext={() => onNext(gender)}
      ></NavigationBar>

      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText boldContent="성별" normalContent="을"></BoldText>,
          '선택해주세요',
        ]}
      ></Paragraph>

      <ButtonWrapper>
        <Button
          color="#ffffff"
          mode="NORMAL_GRAY"
          msg="남성"
          onClick={() => setGender('남성')}
        ></Button>
        <Button
          color="#ffffff"
          mode="NORMAL_GRAY"
          msg="여성"
          onClick={() => setGender('여성')}
        ></Button>
      </ButtonWrapper>
    </Wrapper>
  );
}

export default Gender;
