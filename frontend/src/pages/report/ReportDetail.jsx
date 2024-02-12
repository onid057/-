import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import BoldText from '../../components/common/BoldText';
import HorizontalLine from '../../components/common/HorizontalLine';
import Paragraph from '../../components/common/Paragraph';
import { useNavigate, useParams } from 'react-router';
import { getReportData } from '../../apis/api/report';
import { calculateReportWritingTime } from '../../utils/time';

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

const Blank = styled.div`
  width: 28px;
`;

const ReportWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: start;
  font-size: 20px;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

const ContentWrapper = styled.div`
  background-color: white;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 10px;
  font-size: 18px;
  width: 288px;
  height: 150px;
`;

function ReportDetail() {
  const navigate = useNavigate();
  const onPrevious = () => {
    navigate(-1);
  };

  const [reportInfos, setReportInfos] = useState([]);
  // const { roomId } = useParams();

  useEffect(() => {
    getReportData().then(response => {
      setReportInfos(response.data);
    });
  }, []);

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
        centerContent={'정기 보고서'}
        rightContent={<Blank></Blank>}
        onPrevious={onPrevious}
      ></NavigationBar>
      <Paragraph
        gap={'20px'}
        fontSize={'35px'}
        sentences={[
          <BoldText fontSize={'35px'} boldContent={'{ 장수민 }'}></BoldText>,
          '사용자님',
        ]}
      ></Paragraph>
      <BoldText
        fontSize={'20px'}
        boldContent={'[ 작성자 ]'}
        normalContent={' 곽희웅 집사님'}
      ></BoldText>
      {reportInfos.map((info, idx) => (
        <ReportWrapper key={idx}>
          <HorizontalLine height={'7px'} color={'#D9D9D9'}></HorizontalLine>
          <TextWrapper>
            <BoldText
              fontSize={'18px'}
              boldContent={'작성시간 '}
              normalContent={calculateReportWritingTime(info.createdAt)}
            ></BoldText>
          </TextWrapper>
          <Image
            src={info.processImage}
            width={'288px'}
            height={'288px'}
          ></Image>
          <TitleWrapper>내용</TitleWrapper>
          <ContentWrapper>{info.processContent}</ContentWrapper>
        </ReportWrapper>
      ))}
    </Wrapper>
  );
}

export default ReportDetail;
