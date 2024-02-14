import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import Accordian from '../../components/common/Accordian';
import NavigateText from '../../components/common/NavigateText';

import { useNavigate } from 'react-router-dom';
import { getUserActivityHistory } from '../../apis/api/userMyPage';
import { converToyyyymmdd } from '../../utils/time';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const DetailContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
`;

const ServiceWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 35px 0 0;
  gap: 50px;
`;

function UserActivityHistory() {
  const [activityList, setActivityList] = useState([]);
  const detailInfo = [
    { label: '일시', key: 'endedAt' },
    { label: '맡긴 일', key: 'subCategoryName' },
    { label: '지불한 금액', key: 'totalPay' },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    getUserActivityHistory().then(resp => {
      setActivityList(resp.data);
    });
  }, []);

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
      <BoldText fontSize={'35px'} normalContent={'나의 사용 내역'}></BoldText>
      {activityList.length === 0 && (
        <ServiceWrapper>
          <Paragraph
            fontSize={'20px'}
            sentences={['아직 서비스를 이용한 경험이', '없으시네요']}
            gap={'7px'}
          ></Paragraph>
          <Paragraph
            fontSize={'20px'}
            sentences={[
              '아래에서',
              '다양한 서비스를 만나보세요!',
              <NavigateText
                nextPage={'/matchOption'}
                children={'서비스 이용하러 가기'}
              ></NavigateText>,
            ]}
            gap={'7px'}
          ></Paragraph>
        </ServiceWrapper>
      )}
      {activityList.map((activity, idx) => (
        <Accordian
          title={
            <Paragraph
              gap={'8px'}
              fontSize={'20px'}
              sentences={[
                <BoldText
                  fontSize={'20px'}
                  boldContent={`{ ${activity.name} }`}
                  normalContent={' 집사와'}
                />,
                '함께한 기억이 있어요',
              ]}
            ></Paragraph>
          }
          content={
            <ContentWrapper>
              {detailInfo.map((info, idx) => (
                <DetailContentWrapper key={idx}>
                  {info.label}
                  <BoldText
                    fontSize={'16px'}
                    boldContent={
                      info.label !== '일시'
                        ? activity[info.key]
                        : converToyyyymmdd(activity[info.key])
                    }
                    normalContent={null}
                  ></BoldText>
                </DetailContentWrapper>
              ))}
            </ContentWrapper>
          }
          key={idx}
        ></Accordian>
      ))}
    </Wrapper>
  );
}
export default UserActivityHistory;
