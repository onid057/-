import { useQuery } from '@tanstack/react-query';
import { getReservationListByUser } from '../../apis/api/reserve';
import { convertToHour, calculateRemainDate } from '../../utils/time';
import styled from 'styled-components';
import Notice from '../../components/common/Notice';
import Image from '../../components/common/Image';
import Paragraph from '../../components/common/Paragraph';
import BoldText from '../../components/common/BoldText';
import MenuBar from '../../components/common/MenuBar';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 25px 16px 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

function Reserve() {
  const { data } = useQuery({
    queryKey: ['reservationListByUser'],
    queryFn: () => getReservationListByUser(1),
  });

  console.log(data);

  return (
    <Wrapper>
      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText boldContent="예약" normalContent="한"></BoldText>,
          '목록이에요.',
        ]}
        margin="0 0 20px 0"
      ></Paragraph>

      {data?.map((reservation, index) => {
        return (
          <Notice
            key={index}
            upper={[
              <Image
                src={
                  process.env.PUBLIC_URL +
                  (true ? '/images/star.svg' : '/images/sandTimer.svg')
                }
                width="30px"
                height="30px"
                margin="4px 0 0 0"
              ></Image>,
              <BoldText
                fontSize="20px"
                boldContent={reservation.name}
                normalContent=" 집사님과"
              ></BoldText>,
            ]}
            lower={[
              <Paragraph
                fontSize="16px"
                gap="10px"
                sentences={[
                  <BoldText
                    boldContent={`${calculateRemainDate(reservation.expectationStartedAt)} ${convertToHour(reservation.expectationStartedAt)}시`}
                    normalContent="에"
                  ></BoldText>,
                  <BoldText
                    boldContent={
                      reservation.majorCategoryName === ('상관없음' || '기타')
                        ? '약속한 일'
                        : reservation.majorCategoryName
                    }
                    normalContent=" 이 예정되어 있어요."
                  ></BoldText>,
                ]}
              ></Paragraph>,
            ]}
            nextPage="/reserveDetail"
          ></Notice>
        );
      })}

      <MenuBar currentMenu="RESERVE"></MenuBar>
    </Wrapper>
  );
}

export default Reserve;
