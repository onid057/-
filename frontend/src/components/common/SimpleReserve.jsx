import styled from 'styled-components';
import BoldText from './BoldText';
import Paragraph from './Paragraph';
import Image from './Image';
import Button from './Button';

import { startTask, endTask } from '../../apis/api/match';
import { useNavigate } from 'react-router-dom';
import { calculateRemainDate } from '../../utils/time';

const Wrapper = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LeftWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const RightWrppaer = styled.div``;
const BlueTextWrapper = styled.span`
  color: #629af9;
`;
const ButtonWrapper = styled.div`
  width: 65%;
  display: flex;
  gap: 5px;
`;

function SimpleReserve({
  mode,
  status,
  roomId,
  name,
  majorCategory,
  createdAt,
  onClick,
}) {
  const navigate = useNavigate();
  const diffTime = new Date(createdAt).getTime() - new Date();
  const isRemainTimeLowerThanHalfOfHour =
    diffTime <= 1000 * 60 * 30 && diffTime >= 0;

  return (
    <Wrapper>
      <LeftWrapper>
        <BoldText
          fontSize={'13px'}
          boldContent={<BlueTextWrapper>!!</BlueTextWrapper>}
          normalContent={
            ' 예약 | ' +
            (status === 'ONGOING'
              ? '진행중'
              : isRemainTimeLowerThanHalfOfHour
                ? `${Math.floor((diffTime / 1000) * 60)}분 후`
                : `${calculateRemainDate(createdAt)} 예정`)
          }
        ></BoldText>
        <Paragraph
          gap={'5px'}
          fontSize={'16px'}
          sentences={[
            <BoldText
              boldContent={name}
              normalContent={mode === 'ZIPSA' ? ' 고객님과' : ' 집사님과'}
            ></BoldText>,
            <BoldText
              boldContent={
                majorCategory === '상관없음' ? '약속' : majorCategory
              }
              normalContent={
                status === 'ONGOING'
                  ? ' 을 진행중이에요.'
                  : isRemainTimeLowerThanHalfOfHour
                    ? '을 곧 시작해요.'
                    : '을 앞두고 있어요.'
              }
            ></BoldText>,
          ]}
        ></Paragraph>

        {mode === 'ZIPSA' &&
          (status === 'ONGOING' || isRemainTimeLowerThanHalfOfHour) && (
            <ButtonWrapper>
              <Button
                mode="THIN_BLUE"
                onClick={() => {
                  startTask(roomId).then(response => console.log(response));
                  navigate(`/report/${roomId}`);
                }}
              >
                시작
              </Button>
              <Button
                mode="THIN_WHITE"
                onClick={() => {
                  endTask(roomId).then(response => console.log(response));
                  navigate(`/report/${roomId}`);
                }}
              >
                종료
              </Button>
            </ButtonWrapper>
          )}
      </LeftWrapper>

      <RightWrppaer>
        <Image
          width="24px"
          height="24px"
          margin="0 0 0 -12px"
          src={process.env.PUBLIC_URL + '/images/right_arrow.svg'}
          onClick={onClick}
        ></Image>
      </RightWrppaer>
    </Wrapper>
  );
}

export default SimpleReserve;
