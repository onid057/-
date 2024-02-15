import styled from 'styled-components';
import Image from '../../components/common/Image';
import Paragraph from '../../components/common/Paragraph';
import MenuBar from '../../components/common/MenuBar';

const Wrapper = styled.div`
  width: 320px;
  margin: 0 auto;
  padding: 40px 16px 0 16px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const HeadWrapper = styled.div`
  width: 100%;
  min-height: 509px;
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
  width: 288px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div`
  width: 288px;
  margin: 70px 0 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

function StartMatch() {
  return (
    <Wrapper>
      <HeadWrapper>
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
            sentences={['가장 먼저 요청을 수락한', '집사와 매칭이 성사돼요!']}
          ></Paragraph>
          <Paragraph
            gap="5px"
            fontSize="18px"
            sentences={[
              '24시간 동안 매칭이 이뤄지지',
              '않으면 요청이 사라져요.',
            ]}
          ></Paragraph>
          <Paragraph
            gap="5px"
            fontSize="18px"
            sentences={['매칭의 경과는', '"예약" 메뉴에서 확인할 수 있어요.']}
          ></Paragraph>
        </Content>
      </HeadWrapper>
      <MenuBar></MenuBar>
    </Wrapper>
  );
}

export default StartMatch;
