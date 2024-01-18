import { styled } from 'styled-components';

import Image from '../components/common/Image';
import Paragraph from '../components/common/Paragraph';
import NavigateText from '../components/common/NavigateText';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 60px 16px;
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

function FailMatch() {
  return (
    <Wrapper>
      <Title>
        <Paragraph
          fontSize="35px"
          sentences={['매칭을', '실패했어요']}
        ></Paragraph>
        <Image src="/images/stop.svg"></Image>
      </Title>

      <Content>
        <Paragraph
          fontSize="18px"
          sentences={['아쉽지만 이번', '매칭은 성사되지 않았어요.']}
        ></Paragraph>
        <Paragraph
          fontSize="18px"
          sentences={['하지만 다른', '집사님이 기다리고 있어요!']}
        ></Paragraph>
        <NavigateText>다른 집사님 찾으러 가기</NavigateText>
      </Content>
    </Wrapper>
  );
}

export default FailMatch;
