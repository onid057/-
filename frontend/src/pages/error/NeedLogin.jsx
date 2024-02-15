import { styled } from 'styled-components';

import Image from '../../components/common/Image';
import Paragraph from '../../components/common/Paragraph';
import NavigateText from '../../components/common/NavigateText';

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

function NeedLogin() {
  return (
    <Wrapper>
      <Title>
        <Paragraph
          gap="5px"
          fontSize="35px"
          sentences={['로그인이', '필요합니다']}
        ></Paragraph>
        <Image
          src={process.env.PUBLIC_URL + '/images/lock.svg'}
          width="100px"
          height="100px"
        ></Image>
      </Title>

      <Content>
        <Paragraph
          gap="5px"
          fontSize="18px"
          sentences={['로그인 후에', '해당 페이지를 이용할 수 있어요.']}
        ></Paragraph>

        <NavigateText nextPage={'/'}>로그인 하러 가기</NavigateText>
      </Content>
    </Wrapper>
  );
}

export default NeedLogin;
