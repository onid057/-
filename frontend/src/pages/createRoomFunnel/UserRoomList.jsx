import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import Paragraph from '../../components/common/Paragraph';
import BoldText from '../../components/common/BoldText';
import { useNavigate } from 'react-router-dom';
import { calculateRemainDate } from '../../utils/time';
import { getUserRoomList } from '../../apis/api/room';
import { useUserInfo } from '../../hooks/useUserInfo';
import MenuBar from '../../components/common/MenuBar';

const Wrapper = styled.div`
  width: 320px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const HeadWrapper = styled.div`
  width: 100%;
  min-height: 509px;
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

const CreateButton = styled.button`
  width: 288px;
  height: 85px;
  border: 1px dashed black;
  border-radius: 25px;
  background-color: white;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const RoomItemWrapper = styled.div`
  width: 288px;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 25px;
  background-color: white;
  gap: 30px;
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

function UserRoomList() {
  const [roomList, setRoomList] = useState([]);
  const navigate = useNavigate();
  const onPrevious = () => {
    navigate(-1);
  };
  const onClickButton = () => {
    navigate('/rooms/create');
  };

  const onClickRoom = roomId => {
    navigate(`/rooms/detail/${roomId}`);
  };
  const userState = useUserInfo(state => state.userState);

  useEffect(() => {
    getUserRoomList().then(response => {
      setRoomList(response.data.userPublicRoomList);
    });
  }, []);

  return (
    <Wrapper>
      <HeadWrapper>
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
            sentences={['내가 만든 방']}
            textAlign={'left'}
          ></Paragraph>
        </TitleWrapper>
        {!roomList.length && (
          <Paragraph
            fontSize={'18px'}
            sentences={['아직 생성된 방이 없어요']}
          ></Paragraph>
        )}
        <CreateButton onClick={onClickButton}>
          <Image
            src={`${process.env.PUBLIC_URL}/images/plus.svg`}
            width={'33.33px'}
            height={'33.33px'}
          ></Image>
          <Paragraph fontSize={'18px'} sentences={['새 방 만들기']}></Paragraph>
        </CreateButton>
        {roomList.map((item, idx) => (
          <RoomItemWrapper key={idx} onClick={() => onClickRoom(item.roomId)}>
            <BoldText fontSize={'16px'} boldContent={item.title} />
            <RoomInfoWrapper>
              <HeadingWrapper $color={'red'}>남은시간</HeadingWrapper>
              <>{calculateRemainDate(item.roomCreatedAt)}</>
            </RoomInfoWrapper>
          </RoomItemWrapper>
        ))}
      </HeadWrapper>
      <MenuBar isWorked={userState === 'ZIPSA'}></MenuBar>
    </Wrapper>
  );
}

export default UserRoomList;
