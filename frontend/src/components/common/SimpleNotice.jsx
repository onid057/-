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

function SimpleNotice({
  mode,
  status,
  name,
  majorCategory,
  createdAt,
  onClick,
}) {
  return (
    <Wrapper>
      <LeftWrapper>
        <BoldText
          fontSize={'13px'}
          boldContent={
            <BlueTextWrapper>
              {status === 'CONFIRM' || status === 'REPORT' ? '@' : '#'}
            </BlueTextWrapper>
          }
          normalContent={
            (status === 'CONFIRM' || status === 'REPORT'
              ? ' 정기 보고'
              : mode === 'ZIPSA'
                ? ' 제안'
                : ' 지원') + ` | ${createdAt}`
          }
        ></BoldText>
        <Paragraph
          gap={'5px'}
          fontSize={'16px'}
          sentences={[
            <BoldText
              boldContent={name}
              normalContent={mode === 'ZIPSA' ? ' 고객님이' : ' 집사님이'}
            ></BoldText>,

            <BoldText
              boldContent={
                status === 'CONFIRM' || status === 'REPORT'
                  ? '정기 보고서'
                  : majorCategory === '상관없음'
                    ? '매칭'
                    : majorCategory
              }
              normalContent={
                status === 'CONFIRM'
                  ? ' 를 작성하셨어요.'
                  : mode === 'ZIPSA'
                    ? ' 을 제안하셨어요.'
                    : ' 을 지원하셨어요.'
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

export default SimpleNotice;
