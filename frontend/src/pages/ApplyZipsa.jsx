import React from 'react';
import styled from 'styled-components';
import NavigationBar from '../components/common/NavigationBar';
import BoldText from '../components/common/BoldText';
import Paragraph from '../components/common/Paragraph';
import Image from '../components/common/Image';
import Button from '../components/common/Button';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const TitleWrapper = styled.div`
  width: 288px;
  height: 260px;
  padding: 20px 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 25px;
  gap: 15px;
`;

const TitleUpperWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
`;

const TitleCenterWrapper = styled.div`
  text-align: center;
  position: relative;
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: -20px;
  right: -10px;
  z-index: 999;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-image: url(${process.env.PUBLIC_URL}/images/magnifier.svg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

function ApplyZipsa() {
  const titleContent = [
    ['한', '동네'],
    ['집', '근처'],
    ['사', '람만나기'],
  ];

  const InfoContent = [
    {
      url: `${process.env.PUBLIC_URL}/images/schedule.svg`,
      normalContent: ['내가 원할 때만', '일하는'],
      boldContent: ['자유로운 스케줄'],
    },
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
        centerContent={'집사 지원하기'}
        rightContent={' '}
      ></NavigationBar>
      <TitleWrapper>
        <TitleUpperWrapper>
          <Image
            src={`${process.env.PUBLIC_URL}/images/3d_arrow.svg`}
            width={'18px'}
            height={'18px'}
          ></Image>
          {titleContent.map((value, idx) => (
            <BoldText
              fontSize={'18px'}
              boldContent={value[0]}
              normalContent={value[1]}
              key={idx}
            />
          ))}
        </TitleUpperWrapper>
        <TitleCenterWrapper>
          <Paragraph
            gap={'10px'}
            fontSize={'35px'}
            sentences={['집사님을', '모집합니다']}
          ></Paragraph>
          <ImageWrapper></ImageWrapper>
        </TitleCenterWrapper>
        <Button msg={'집사 지원하기'} color={'#629af9'}></Button>
      </TitleWrapper>
      <ContentWrapper>
        <BoldText
          fontSize={'25px'}
          boldContent={null}
          normalContent={'집사가 된다면'}
        />
        <TitleWrapper>
          {InfoContent.map((content, idx) => (
            <Paragraph
              key={idx}
              gap={'10px'}
              fontSize={'18px'}
              sentences={[
                <Image
                  src={content.url}
                  width={'134px'}
                  height={'134px'}
                ></Image>,
                ...content.normalContent,
                <BoldText
                  fontSize={'18px'}
                  boldContent={content.boldContent}
                  normalContent={null}
                />,
              ]}
            ></Paragraph>
          ))}
        </TitleWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

export default ApplyZipsa;
