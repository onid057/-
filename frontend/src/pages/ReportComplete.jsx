import React from 'react';
import styled from 'styled-components';
import Paragraph from '../components/common/Paragraph';
import BoldText from '../components/common/BoldText';
import Image from '../components/common/Image';

const ReportWrapper = styled.div`
  width: 320px;
  height: 568px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.primary};
  line-height: 1.3;
`;

const ContentWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0 0;
  gap: 40px;
`;

const Upper = styled.div`
  width: 260px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;
const Lower = styled.div`
  width: 294px;
  height: 294px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background-color: white;
`;

// 아래 content가 가운데 정렬이 되지 않아서 하나씩 넣어주었다.
const LowerContent = [
  '오늘도 당신의 노고에',
  <BoldText
    fontSize={'18px'}
    BoldContent={'감사'}
    NormalContent={'드립니다.'}
  />,
];

const LowerContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

export default function ReportComplete({ name }) {
  const UpperContent = [
    <BoldText
      fontSize={'25px'}
      BoldContent={`${name}`}
      NormalContent={'님의'}
    />,
    <BoldText
      fontSize={'35px'}
      BoldContent={'보고서 작성'}
      NormalContent={'을'}
    />,
    '완료했어요!',
  ];

  return (
    <ReportWrapper>
      <ContentWrapper>
        <Upper>
          <Paragraph
            gap={'10px'}
            fontSize={'35px'}
            sentences={UpperContent}
          ></Paragraph>
        </Upper>
        <Lower>
          <Image
            src={`${process.env.PUBLIC_URL}/images/heart.svg`}
            width={'150px'}
            height={'150px'}
          ></Image>
          <LowerContentWrapper>
            <Paragraph
              gap={''}
              fontSize={'18px'}
              sentences={[LowerContent[0]]}
            ></Paragraph>
            <Paragraph
              gap={''}
              fontSize={'18px'}
              sentences={[LowerContent[1]]}
            ></Paragraph>
          </LowerContentWrapper>
        </Lower>
      </ContentWrapper>
    </ReportWrapper>
  );
}
