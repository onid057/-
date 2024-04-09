import { styled } from 'styled-components';

import Image from '../../components/common/Image';
import Paragraph from '../../components/common/Paragraph';
import MenuBar from '../../components/common/MenuBar';
import BoldText from '../../components/common/BoldText';
import { useUserInfo } from '../../hooks/useUserInfo';

const Wrapper = styled.div`
  width: 320px;
  margin: 0 auto;
  padding: 60px 16px 0;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const HeadWrapper = styled.div`
  width: 100%;
  min-height: 429px;
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

function SuccessMatch() {
  const userState = useUserInfo(state => state.userState);
  return (
    <Wrapper>
      <HeadWrapper>
        <Title>
          <Paragraph
            fontSize="35px"
            sentences={['매칭을', '성공했어요!']}
          ></Paragraph>
          <Image src="/images/handshaking.svg"></Image>
        </Title>

        <Content>
          <Paragraph
            fontSize="18px"
            sentences={[
              '매칭의 정보와',
              '집사님의 상세 정보는',
              <BoldText
                fontSize={'18px'}
                boldContent={"'예약'"}
                normalContent={' 배너에서 확인할 수 있어요.'}
              ></BoldText>,
            ]}
          ></Paragraph>
        </Content>
      </HeadWrapper>
      <MenuBar isWorked={userState === 'ZIPSA'}></MenuBar>
    </Wrapper>
  );
}

export default SuccessMatch;
