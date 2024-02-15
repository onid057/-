import React from 'react';
import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import Image from '../../components/common/Image';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const TitleWrapper = styled.div`
  width: 288px;
  padding: 20px 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 25px;
  gap: 50px;
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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InnerContentWrapper = styled.div`
  width: 288px;
  height: 260px;
  padding: 20px 0;
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 25px;
`;

const ButtonWrapper = styled.div`
  width: 260px;
`;

const BoldTextWrapper = styled.div`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`;

const ApplyWrapper = styled.div`
  width: 288px;
  height: 135px;
  padding: 20px 15px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 25px;
  gap: 15px;
`;

function ApplyZipsa() {
  const titleContent = [
    ['한', '동네'],
    ['집', '근처'],
    ['사', '람만나기'],
  ];

  const infoContent = [
    {
      url: `${process.env.PUBLIC_URL}/images/rocket.svg`,
      normalContent: ['내가 원할 때만', '일하는'],
      boldContent: ['자유로운 스케줄'],
    },
    {
      url: `${process.env.PUBLIC_URL}/images/city_work.svg`,
      normalContent: ['동네에서', '간편하게 하는'],
      boldContent: ['아르바이트'],
    },
  ];

  const applyProcedure = [
    {
      normalContent: '집사 지원',
      boldContent: 'step1. ',
    },
    {
      normalContent: '필수교육 이수 및 퀴즈',
      boldContent: 'step2. ',
    },
    {
      normalContent: '서약서 작성 후 지원 완료',
      boldContent: 'step3. ',
    },
  ];

  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate('/education');
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
        onPrevious={() => navigate(-1)}
      ></NavigationBar>
      <TitleWrapper>
        <TitleUpperWrapper>
          <Image
            src={`${process.env.PUBLIC_URL}/images/small_heart.svg`}
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
            fontSize={'25px'}
            sentences={['"집사"님을', '모집합니다!']}
            textAlign={'center'}
          ></Paragraph>
        </TitleCenterWrapper>
      </TitleWrapper>
      <ContentWrapper>
        <BoldText fontSize={'20px'} normalContent={'집사가 된다면!'} />
        <InnerContentWrapper>
          {infoContent.map((content, idx) => (
            <Paragraph
              key={idx}
              gap={'10px'}
              fontSize={'16px'}
              textAlign={'center'}
              sentences={[
                <Image
                  src={content.url}
                  width={'90px'}
                  height={'90px'}
                ></Image>,
                ...content.normalContent,
                <BoldTextWrapper>{content.boldContent}</BoldTextWrapper>,
              ]}
            ></Paragraph>
          ))}
        </InnerContentWrapper>
      </ContentWrapper>
      <ContentWrapper>
        <BoldText
          fontSize={'20px'}
          boldContent={null}
          normalContent={'지원 절차'}
        />
        <ApplyWrapper>
          {applyProcedure.map((content, idx) => (
            <Paragraph
              key={idx}
              gap={'10px'}
              fontSize={'18px'}
              sentences={[
                <BoldText
                  fontSize={'18px'}
                  boldContent={content.boldContent}
                  normalContent={content.normalContent}
                ></BoldText>,
              ]}
              textAlign={'left'}
            ></Paragraph>
          ))}
        </ApplyWrapper>
      </ContentWrapper>
      <ButtonWrapper>
        <Button
          mode={'THICK_BLUE'}
          children={'집사 지원하기'}
          onClick={onButtonClick}
        ></Button>
      </ButtonWrapper>
    </Wrapper>
  );
}

export default ApplyZipsa;
