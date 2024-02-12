import styled from 'styled-components';
import BoldText from './BoldText';
import Paragraph from './Paragraph';
import Image from './Image';

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

function SimpleReserve({ status, name, majorCategory, createdAt, onClick }) {
  return (
    <Wrapper>
      <LeftWrapper>
        <BoldText
          fontSize={'13px'}
          boldContent={<BlueTextWrapper>!!</BlueTextWrapper>}
          normalContent={
            ' 예약 | ' + (status === 'ONGOING' ? '진행중' : `${createdAt} 예정`)
          }
        ></BoldText>
        <Paragraph
          gap={'5px'}
          fontSize={'16px'}
          sentences={[
            <BoldText
              boldContent={name}
              normalContent={' 집사님과'}
            ></BoldText>,
            <BoldText
              boldContent={
                majorCategory === '상관없음' ? '약속' : majorCategory
              }
              normalContent={
                status === 'ONGOING'
                  ? ' 을 진행중이에요.'
                  : ' 을 앞두고 있어요.'
              }
            ></BoldText>,
          ]}
        ></Paragraph>
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
