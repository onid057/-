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

function SimpleNotice({ mode, name, majorCategory, createdAt, onClick }) {
  return (
    <Wrapper>
      <LeftWrapper>
        <BoldText
          fontSize={'13px'}
          boldContent={<BlueTextWrapper>#</BlueTextWrapper>}
          normalContent={
            (mode === 'ZIPSA' ? ' 제안' : ' 지원') + ` | ${createdAt}`
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
              boldContent={majorCategory}
              normalContent={
                mode === 'ZIPSA' ? ' 을 제안하셨어요.' : ' 을 지원하셨어요.'
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
