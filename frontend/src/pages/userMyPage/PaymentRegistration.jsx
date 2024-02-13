import React from 'react';
import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import Paragraph from '../../components/common/Paragraph';
import CenterModeSlider from '../../components/common/CenterModeSlider';

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

const RegistWrapper = styled.div`
  width: 288px;
  height: 226px;
  border-style: dashed;
  border-width: 1px;
  border-spacing: 10px;
  border-radius: 25px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Hr = styled.div`
  width: 100%;
  height: 7px;
  background-color: #d9d9d9;
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
      ></NavigationBar>
      <Paragraph
        gap={'10px'}
        fontSize={'35px'}
        sentences={['간편 결제 수단', '등록하기']}
      ></Paragraph>
      <RegistWrapper>
        <Image
          src={`${process.env.PUBLIC_URL}/images/plus.svg`}
          width={'40px'}
          height={'40px'}
        ></Image>
      </RegistWrapper>
      <Hr></Hr>
      <PaymentListWrapper>
        <>간편 결제 수단 목록</>
        <CenterModeSlider showImages={cardImageUrl}></CenterModeSlider>
      </PaymentListWrapper>
    </Wrapper>
  );
}

export default PaymentRegistration;
