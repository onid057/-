import React from 'react';
import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import Paragraph from '../../components/common/Paragraph';
import CenterModeSlider from '../../components/common/CenterModeSlider';
import HorizontalLine from '../../components/common/HorizontalLine';
import SimpleSlider from '../../components/common/SimpleSlider';
import { useNavigate } from 'react-router-dom';

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

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegistWrapper = styled.div`
  width: 260px;
  height: 226px;
  border-style: dashed;
  border-width: 1px;
  border-spacing: 10px;
  border-radius: 25px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const PaymentListWrapper = styled.div`
  width: 100%;
  font-size: 18px;
`;

function PaymentRegistration() {
  const cardImageUrl = [
    `${process.env.PUBLIC_URL}/images/creditcard.svg`,
    `${process.env.PUBLIC_URL}/images/creditcard.svg`,
  ];

  const navigate = useNavigate();

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
        onPrevious={() => navigate(-1)}
      ></NavigationBar>
      <Paragraph
        gap={'10px'}
        fontSize={'35px'}
        sentences={['간편 결제 수단', '등록하기']}
      ></Paragraph>
      <ContentWrapper>
        <RegistWrapper>
          <Image
            src={`${process.env.PUBLIC_URL}/images/plus.svg`}
            width={'40px'}
            height={'40px'}
          ></Image>
        </RegistWrapper>
      </ContentWrapper>
      <HorizontalLine height={'2px'}></HorizontalLine>
      <PaymentListWrapper>
        <>간편 결제 수단 목록</>
        <CenterModeSlider showImages={cardImageUrl}></CenterModeSlider>
      </PaymentListWrapper>
    </Wrapper>
  );
}

export default PaymentRegistration;
