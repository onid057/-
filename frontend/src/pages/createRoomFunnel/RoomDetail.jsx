import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import Paragraph from '../../components/common/Paragraph';
import BoldText from '../../components/common/BoldText';
import Buttton from '../../components/common/Button';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 22px 17px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #ffffff;
  border-radius: 25px;
  font-size: 16px;
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: start;
  gap: 15px;
`;

const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DetailWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const Bold = styled.div`
  font-weight: 600;
  line-height: 1.3;
`;

function RoomDetail() {
  const navigate = useNavigate();
  const onPrevious = () => {
    navigate(-1);
  };

  const ZipsaList = ['hi'];

  const info = {
    title: '강아지 대신 산책시켜 주실 분',
    date: '2024년 01월 10일',
    duration: '13:00 (1시간)',
    payment: '20,000원',
    address: '경기도 수원시 장안구 하률로 00번길 00 아파트 000동 00호',
    content:
      '집에서 10분 거리에 있는 미용실을 예약했는데, 함께 가서 기다렸다가 돌아왔으면 좋겠어요. 함께 이야기도 나눠요.',
  };
  const infoEntries = [
    ['date', '날짜'],
    ['duration', '시간'],
    ['payment', '금액'],
  ];

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
      <TitleWrapper>
        <BoldText
          boldContent={'모집'}
          normalContent={' 정보'}
          fontSize={'20px'}
        ></BoldText>
      </TitleWrapper>
      <ContentWrapper>
        <BoldText boldContent={info.title}></BoldText>
        {infoEntries.map((value, idx) => (
          <TextWrapper key={idx}>
            <>{value[1]}</>
            <BoldText boldContent={info[value[0]]}></BoldText>
          </TextWrapper>
        ))}
        <DetailWrapper>
          <>장소</>
          <Bold>{info.address}</Bold>
        </DetailWrapper>
        <DetailWrapper>
          <>상세 내용</>
          <Bold>{info.content}</Bold>
        </DetailWrapper>
      </ContentWrapper>
      <TitleWrapper>
        {ZipsaList.length ? (
          <>
            <Paragraph
              fontSize={'18px'}
              sentences={['집사의 요청을 확인해보세요']}
            ></Paragraph>
            <Buttton mode={'THICK_BLUE'} children={'요청확인'}></Buttton>
          </>
        ) : (
          <Paragraph
            fontSize={'18px'}
            sentences={['아직 집사의 요청이 오지 않았어요']}
          ></Paragraph>
        )}
      </TitleWrapper>
    </Wrapper>
  );
}

export default RoomDetail;
