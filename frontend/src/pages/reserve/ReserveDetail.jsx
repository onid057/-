import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import BoldText from '../../components/common/BoldText';
import Notice from '../../components/common/Notice';
import Paragraph from '../../components/common/Paragraph';
import HorizontalLine from '../../components/common/HorizontalLine';
import { converToyyyymmdd } from '../../utils/time';
import { convertToWon } from '../../utils/money';
import { getReservationDetailInfoByUser } from '../../apis/api/reserve';

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

const ZipsaInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MatchInfoWrapper = styled.div`
  width: 100%;
  padding: 22px 17px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #ffffff;
  border-radius: 25px;
  font-size: 16px;
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
  gap: 5px;
`;

const ReportWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 18px 0;
`;

function ReserveDetail() {
  const navigate = useNavigate();

  const onPrevious = () => {
    navigate(-1);
  };

  const [reservationInfo, setReservationInfo] = useState({});
  const { roomId } = useParams();

  useEffect(() => {
    getReservationDetailInfoByUser(roomId).then(response => {
      setReservationInfo(response);
    });
  }, [roomId]);

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

      <ContentWrapper>
        <BoldText
          fontSize={'18px'}
          boldContent={'집사'}
          normalContent={' 정보'}
        ></BoldText>
        <Notice
          upper={[
            <Image
              src={process.env.PUBLIC_URL + '/images/profile_img.svg'}
              width={'60px'}
              height={'60px'}
            ></Image>,
            <ZipsaInfoWrapper>
              <Paragraph
                gap={'20px'}
                fontSize={'13px'}
                sentences={[
                  <BoldText
                    fontSize={'20px'}
                    boldContent={reservationInfo.name}
                    normalContent={' 집사님'}
                  ></BoldText>,
                ]}
              ></Paragraph>
              <Image
                src={process.env.PUBLIC_URL + '/images/right_arrow.svg'}
                width={'24px'}
                height={'24px'}
              ></Image>
            </ZipsaInfoWrapper>,
          ]}
          padding={'10px 15px'}
          nextPage={'/'}
        ></Notice>
      </ContentWrapper>

      <ContentWrapper>
        <BoldText
          fontSize={'18px'}
          boldContent={'매칭'}
          normalContent={' 정보'}
        ></BoldText>
        <MatchInfoWrapper>
          <TextWrapper>
            <>일시</>
            <BoldText
              boldContent={converToyyyymmdd(
                reservationInfo.expectationStartedAt,
              )}
            ></BoldText>
          </TextWrapper>
          <TextWrapper>
            <>맡긴 일</>
            <BoldText
              boldContent={reservationInfo.majorCategoryName}
            ></BoldText>
          </TextWrapper>
          <TextWrapper>
            <>지불한 금액</>
            <BoldText
              boldContent={convertToWon(reservationInfo.expectationPay)}
            ></BoldText>
          </TextWrapper>
          <DetailWrapper>
            <>상세 내용</>
            <BoldText boldContent={reservationInfo.content}></BoldText>
          </DetailWrapper>
        </MatchInfoWrapper>
      </ContentWrapper>

      {reservationInfo.isReported && (
        <>
          <HorizontalLine height={'2px'}></HorizontalLine>

          <ContentWrapper>
            <BoldText
              fontSize={'18px'}
              boldContent={reservationInfo.name}
              normalContent={' 님이 작성한 리포트'}
            ></BoldText>
            <Notice
              upper={[
                <ReportWrapper>
                  리포트 보러가기
                  <Image
                    src={process.env.PUBLIC_URL + '/images/right_arrow.svg'}
                    width={'24px'}
                    height={'24px'}
                  ></Image>
                </ReportWrapper>,
              ]}
              padding={'10px 15px'}
              nextPage={`/reportDetail/${roomId}`}
            ></Notice>
          </ContentWrapper>
        </>
      )}
    </Wrapper>
  );
}

export default ReserveDetail;
