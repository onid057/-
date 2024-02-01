import { styled } from 'styled-components';

import BoldText from '../components/common/BoldText';
import Paragraph from '../components/common/Paragraph';
import Image from '../components/common/Image';
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

function SuggestionPage() {
  return (
    <Wrapper>
      <Title>
        <Paragraph
          gap="5px"
          fontSize="30px"
          sentences={[
            <BoldText boldContent="{ 곽희웅 }"></BoldText>,
            '집사님의 제안',
          ]}
        ></Paragraph>
        <Image
          src={process.env.PUBLIC_URL + '/images/finger.svg'}
          width="100px"
          height="100px"
        ></Image>
      </Title>

      <Content>
        <Paragraph
          gap="5px"
          fontSize="18px"
          sentences={['집사님의 프로필을', '보고 꼼꼼하게 선택하세요!']}
        ></Paragraph>

        <NavigateText nextPage={-1}>{'곽희웅'} 집사님 프로필 보기</NavigateText>

        <Paragraph
          gap="5px"
          fontSize="18px"
          sentences={['충분히 검토하셨다면', '결정을 내려주세요!']}
        ></Paragraph>
      </Content>
    </Wrapper>
  );
}

export default SuggestionPage;
