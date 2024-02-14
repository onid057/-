import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import BoldText from '../../components/common/BoldText';
import HorizontalLine from '../../components/common/HorizontalLine';
import Paragraph from '../../components/common/Paragraph';
import LongInputBox from '../../components/common/LongInputBox';

import { useNavigate, useParams } from 'react-router-dom';
import { getReportData } from '../../apis/api/report';
import { calculateReportWritingTime } from '../../utils/time';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 15px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const ReportWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

function ReportDetail() {
  const navigate = useNavigate();
  const onPrevious = () => {
    navigate(-1);
  };

  const [reportInfos, setReportInfos] = useState();
  const { roomId } = useParams();

  useEffect(() => {
    getReportData(roomId).then(response => {
      console.log(response);
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
        onPrevious={onPrevious}
      ></NavigationBar>
      <Paragraph
        gap={'5px'}
        fontSize={'35px'}
        sentences={[
          <BoldText boldContent={'집사'} normalContent={'가'}></BoldText>,
          '보낸 리포트',
        ]}
      ></Paragraph>

      <Paragraph
        gap={'5px'}
        fontSize={'15px'}
        sentences={[
          `보낸 사람 : ${reportInfos?.zipsaName} 집사`,
          `받는 사람 : ${reportInfos?.userName} 고객`,
        ]}
      ></Paragraph>

      {reportInfos?.reportList.map((info, idx) => (
        <ReportWrapper key={idx}>
          <HorizontalLine height={'2px'}></HorizontalLine>
          <Image
            src={info.processImage}
            width={'288px'}
            height={'288px'}
          ></Image>
          <LongInputBox
            value={info.processContent}
            disabled={true}
          ></LongInputBox>

          <TextWrapper>
            {calculateReportWritingTime(info.createdAt)}
          </TextWrapper>
        </ReportWrapper>
      ))}
    </Wrapper>
  );
}

export default ReportDetail;
