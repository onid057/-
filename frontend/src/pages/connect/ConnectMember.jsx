import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import Image from '../../components/common/Image';
import NavigationBar from '../../components/common/NavigationBar';
import NavigateButton from '../../components/common/NavigateButton';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const MemberWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
  align-items: center;
  font-size: 20px;
  font-weight: 400;
`;

function ConnectCodeShow() {
  const navigate = useNavigate();

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
        margin="0 0 20px 0"
        gap="5px"
        fontSize="35px"
        sentences={[<BoldText boldContent={'멤버'}></BoldText>]}
      ></Paragraph>

      <MemberWrapper>
        <Image
          width="60px"
          height="60px"
          margin="4px 0 0 0"
          src={process.env.PUBLIC_URL + '/images/profile_img.svg'}
        ></Image>
        {`${'장수민'} (${'나, 대표'})`}
      </MemberWrapper>
      <MemberWrapper>
        <Image
          width="60px"
          height="60px"
          margin="4px 0 0 0"
          src={process.env.PUBLIC_URL + '/images/profile_img.svg'}
        ></Image>
        {`${'곽희웅'} (${'멤버'})`}
      </MemberWrapper>
      <NavigateButton onClick={() => navigate('/connectCode/show')}>
        멤버 추가하기
      </NavigateButton>
    </Wrapper>
  );
}

export default ConnectCodeShow;
