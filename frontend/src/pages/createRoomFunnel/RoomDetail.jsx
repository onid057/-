import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import Paragraph from '../../components/common/Paragraph';
import BoldText from '../../components/common/BoldText';
import Buttton from '../../components/common/Button';
import BottomSheet from '../../components/common/BottomSheet';
import { getRoomDetailInfo } from '../../apis/api/room';

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
  position: relative;
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
  gap: 5px;
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

  const [roomInfo, setRoomInfo] = useState({});
  const { roomId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false); // 상세 정보
  const modalRef = useRef(null);

  useEffect(() => {
    getRoomDetailInfo(roomId).then(response => {
      setRoomInfo(response.data);
    });
  }, []);

  // bottom sheet 영역 이외의 부분을 클릭 시 모달 isOpen 변경
  useEffect(() => {
    const closeBottomSheet = event => {
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', closeBottomSheet);
    return () => {
      document.removeEventListener('mousedown', closeBottomSheet);
    };
  }, [isOpen]);

  const onButtonClick = () => {
    setIsOpen(true);
    setIsDetailOpen(false);
  };

  const formattingDate = date => {
    const serviceDate = new Date(date);
    const year = serviceDate.getFullYear();
    const month = String(serviceDate.getMonth() + 1).padStart(2, '0');
    const day = String(serviceDate.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
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
          boldContent={'모집'}
          normalContent={' 정보'}
          fontSize={'20px'}
        ></BoldText>
      </TitleWrapper>

      <ContentWrapper>
        <BoldText boldContent={roomInfo.title}></BoldText>
        <TextWrapper>
          <>날짜</>
          <BoldText
            boldContent={formattingDate(roomInfo.expectationStartedAt)}
          ></BoldText>
        </TextWrapper>
        <TextWrapper>
          <>시간</>
          <BoldText boldContent={roomInfo.estimateDuration}></BoldText>
        </TextWrapper>
        <TextWrapper>
          <>금액</>
          <BoldText boldContent={roomInfo.expectationPay}></BoldText>
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

      <TitleWrapper>
        <Paragraph
          fontSize={'18px'}
          sentences={['집사의 요청을 확인해보세요']}
        ></Paragraph>
        <Buttton
          mode={'THICK_BLUE'}
          children={'요청확인'}
          onClick={onButtonClick}
        ></Buttton>
      </TitleWrapper>

      <BottomSheet
        isOpen={isOpen}
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        ref={modalRef}
        onClick={() => {
          setIsOpen(false);
        }}
        roomId={roomId}
      ></BottomSheet>
    </Wrapper>
  );
}

export default RoomDetail;
