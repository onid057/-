import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import BoldText from '../../components/common/BoldText';
import Buttton from '../../components/common/Button';
import { getRoomDetailInfo, applyForRoom } from '../../apis/api/room';
import { convertToWon } from '../../utils/money';

const Wrapper = styled.div`
  width: 320px;
  min-height: 586px;
  margin: 0 auto;
  padding: 0 16px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
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
  gap: 15px;
  background-color: #ffffff;
  border-radius: 25px;
  font-size: 16px;
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
  flex-direction: column;
  align-items: start;
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

const Bold = styled.div`
  font-weight: 600;
  line-height: 1.3;
`;

function ZipsaRoomDetail() {
  const navigate = useNavigate();
  const onPrevious = () => {
    navigate(-1);
  };
  const [roomInfo, setRoomInfo] = useState({});
  const { roomId } = useParams();

  useEffect(() => {
    getRoomDetailInfo(roomId).then(response => {
      setRoomInfo(response.data);
    });
  }, [roomId]);

  const formattingDate = date => {
    const serviceDate = new Date(date);
    const year = serviceDate.getFullYear();
    const month = String(serviceDate.getMonth() + 1).padStart(2, '0');
    const day = String(serviceDate.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
  };

  const onButtonClick = () => {
    applyForRoom(roomId).then(response => console.log(response));
  };

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
          boldContent={'공개방'}
          normalContent={' 상세정보'}
          fontSize={'30px'}
        ></BoldText>
      </TitleWrapper>

      <ContentWrapper>
        <TitleWrapper>
          <BoldText boldContent={roomInfo.title}></BoldText>
        </TitleWrapper>
        <TextWrapper>
          <>날짜</>
          <BoldText
            boldContent={formattingDate(roomInfo.expectationStartedAt)}
          ></BoldText>
        </TextWrapper>
        <TextWrapper>
          <>시간</>
          <BoldText boldContent={`${roomInfo.estimateDuration}시간`}></BoldText>
        </TextWrapper>
        <TextWrapper>
          <>금액</>
          <BoldText
            boldContent={convertToWon(roomInfo.expectationPay)}
          ></BoldText>
        </TextWrapper>
        <DetailWrapper>
          <>장소</>
          <Bold>{roomInfo.place}</Bold>
        </DetailWrapper>
        <DetailWrapper>
          <>상세 내용</>
          <Bold>{roomInfo.content}</Bold>
        </DetailWrapper>
      </ContentWrapper>

      <Buttton
        mode={'THICK_BLUE'}
        children={'지원하기'}
        onClick={onButtonClick}
      ></Buttton>
    </Wrapper>
  );
}
export default ZipsaRoomDetail;
