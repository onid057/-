import { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getReservationListByUser } from '../../apis/api/reserve';
import { useUserInfo } from '../../hooks/useUserInfo';

import styled from 'styled-components';
import Image from '../../components/common/Image';
import Paragraph from '../../components/common/Paragraph';
import BoldText from '../../components/common/BoldText';
import MenuBar from '../../components/common/MenuBar';
import SimpleReserve from '../../components/common/SimpleReserve';
import HorizontalLine from '../../components/common/HorizontalLine';

const Wrapper = styled.div`
  width: 320px;
  margin: 0 auto;
  padding: 25px 16px 0px;
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
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const SimpleReservesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function Reserve() {
  const { data } = useQuery({
    queryKey: ['reservationListByUser'],
    queryFn: () => getReservationListByUser(),
  });

  const userState = useUserInfo(state => state.userState); // 전역에서 관리하는 유저 상태
  const navigate = useNavigate();

  console.log(data);

  return (
    <Wrapper>
      <HeadWrapper>
        <Paragraph
          gap="5px"
          fontSize="35px"
          sentences={[
            <BoldText boldContent="예약" normalContent="한"></BoldText>,
            '목록이에요.',
          ]}
          margin="0 0 20px 0"
        ></Paragraph>

        <SimpleReservesWrapper>
          {data?.map((reservation, index) => {
            return (
              <Fragment key={index}>
                <SimpleReserve
                  mode={userState}
                  status={reservation.status}
                  roomId={reservation.roomId}
                  name={reservation.name}
                  majorCategory={reservation.majorCategoryName}
                  createdAt={reservation.expectationStartedAt}
                  onClick={() =>
                    navigate(`/reserveDetail/${reservation.roomId}`)
                  }
                ></SimpleReserve>

                <HorizontalLine height={'2px'}></HorizontalLine>
              </Fragment>
            );
          })}
        </SimpleReservesWrapper>
      </HeadWrapper>
      <MenuBar currentMenu="RESERVE"></MenuBar>
    </Wrapper>
  );
}

export default Reserve;
