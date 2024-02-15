import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import Paragraph from '../../components/common/Paragraph';
import BoldText from '../../components/common/BoldText';
import { useUserInfo } from '../../hooks/useUserInfo';
import { useNavigate } from 'react-router-dom';
import { calculateRemainTime } from '../../utils/time';
import { convertToWon } from '../../utils/money';
import { getZipsaRoomList } from '../../apis/api/room';

const Wrapper = styled.div`
  width: 320px;
  min-height: 586px;
  margin: 0 auto;
  padding: 0 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const RoomInfosWrapper = styled.div`
  line-height: 1.3;
`;

const RoomItemWrapper = styled.div`
  width: 288px;
  padding: 20px;
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
  const page = 1;
  const size = 50;

  const [roomList, setRoomList] = useState([]);
  const userState = useUserInfo(state => state.userState); // 전역에서 관리하는 유저 상태

  const navigate = useNavigate();
  const onPrevious = () => {
    navigate(-1);
  };
  const onClickRoom = roomId => {
    navigate(`/rooms/zipsa/detail/${roomId}`);
  };

  useEffect(() => {
    getZipsaRoomList(page, size).then(response => {
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

      <Paragraph
        fontSize={'30px'}
        sentences={['공개방으로 모집하기']}
        textAlign={'left'}
        margin={'0 0 20px 0'}
      ></Paragraph>

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
          <RoomInfosWrapper>
            <RoomInfoWrapper>
              <HeadingWrapper>금액</HeadingWrapper>
              <>{convertToWon(item.expectationPay)}</>
            </RoomInfoWrapper>
            <RoomInfoWrapper>
              <HeadingWrapper $color={'red'}>남은시간</HeadingWrapper>
              <>{calculateRemainTime(item.roomCreatedAt)}</>
            </RoomInfoWrapper>
          </RoomInfosWrapper>
        </RoomItemWrapper>
      ))}
    </Wrapper>
  );
}
export default ZipsaRoomList;
