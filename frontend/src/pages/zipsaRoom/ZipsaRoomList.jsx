import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import Paragraph from '../../components/common/Paragraph';
import BoldText from '../../components/common/BoldText';
import { useNavigate } from 'react-router-dom';
import calculateRemainingTime from '../../apis/utils/calculateRemainingTime';
import { getZipsaRoomList } from '../../apis/api/room';

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

const TitleWrapper = styled.div`
  width: 100%;
`;

const RoomItemWrapper = styled.div`
  width: 288px;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 25px;
  background-color: white;
  gap: 20px;
  font-size: 14px;
  cursor: pointer;
`;

const RoomInfoWrapper = styled.div`
  display: flex;
  justify-content: end;
  column-gap: 10px;
`;
const HeadingWrapper = styled.div`
  color: ${props => props.$color || 'black'};
  font-weight: 600;
  font-size: 14px;
`;
function ZipsaRoomList() {
  const [roomList, setRoomList] = useState([]);
  const navigate = useNavigate();
  const onPrevious = () => {
    navigate(-1);
  };
  const onClickRoom = roomId => {
    navigate(`/rooms/zipsa/detail/${roomId}`);
  };

  useEffect(() => {
    getZipsaRoomList().then(response => {
      setRoomList(response.data.publicRoomList);
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
        onPrevious={onPrevious}
      ></NavigationBar>
      <TitleWrapper>
        <Paragraph
          fontSize={'35px'}
          sentences={['내 주변 요청']}
          textAlign={'left'}
        ></Paragraph>
      </TitleWrapper>
      {!roomList.length && (
        <Paragraph
          fontSize={'18px'}
          sentences={['아직 생성된 방이 없어요']}
        ></Paragraph>
      )}
      {roomList.map((item, idx) => (
        <RoomItemWrapper
          key={idx}
          onClick={() => {
            onClickRoom(item.roomId);
          }}
        >
          <BoldText fontSize={'16px'} boldContent={item.title} />
          <RoomInfoWrapper>
            <HeadingWrapper>금액</HeadingWrapper>
            <>{item.expectationPay}원</>
          </RoomInfoWrapper>
          <RoomInfoWrapper>
            <HeadingWrapper $color={'red'}>남은시간</HeadingWrapper>
            <>{calculateRemainingTime(item.roomCreatedAt)}</>
          </RoomInfoWrapper>
        </RoomItemWrapper>
      ))}
    </Wrapper>
  );
}
export default ZipsaRoomList;
