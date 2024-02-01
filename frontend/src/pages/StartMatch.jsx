import { styled } from 'styled-components';

import Image from '../components/common/Image';
import Paragraph from '../components/common/Paragraph';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 11px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
  line-height: 1.3;
`;

const Title = styled.div`
  width: 294px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div`
  width: 294px;
  margin: 60px 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

function StartMatch() {
  return (
    <Wrapper>
      <Title>
        <Paragraph
          fontSize="35px"
          sentences={['매칭을', '시작했어요!']}
        ></Paragraph>
        <Image
          src={process.env.PUBLIC_URL + '/images/handshaking.svg'}
          width={'100px'}
          height={'100px'}
        ></Image>
      </Title>

      <Content>
        <Paragraph
          gap="5px"
          fontSize="18px"
          sentences={['가장 먼저 요청을 수락한', '집사님과 매칭이 성사돼요!']}
        ></Paragraph>
        <Paragraph
          gap="5px"
          fontSize="18px"
          sentences={['24시간 동안 매칭이 이뤄지지', '않으면 요청이 사라져요.']}
        ></Paragraph>
        <Paragraph
          gap="5px"
          fontSize="18px"
          sentences={['매칭의 경과는', '"예약" 배너에서 확인할 수 있어요.']}
        ></Paragraph>
      </Content>
    </Wrapper>
  );
}

export default StartMatch;
