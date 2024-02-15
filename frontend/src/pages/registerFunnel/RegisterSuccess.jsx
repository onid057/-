import styled from 'styled-components';
import Image from '../../components/common/Image';
import Paragraph from '../../components/common/Paragraph';
import MenuBar from '../../components/common/MenuBar';
import NavigateText from '../../components/common/NavigateText';
import { useUserInfo } from '../../hooks/useUserInfo';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 40px 16px 0 16px;
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
  margin: 70px 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

function RegisterSuccess() {
  const userState = useUserInfo(state => state.userState);

  return (
    <Wrapper>
      <Title>
        <Paragraph
          fontSize="35px"
          sentences={['회원가입에', '성공했어요!']}
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
          sentences={['로그인 후', '서비스를 사용할 수 있어요!']}
        ></Paragraph>

        <NavigateText nextPage="/login">로그인하러 가기</NavigateText>
      </Content>

      <MenuBar isWorked={userState === 'ZIPSA'}></MenuBar>
    </Wrapper>
  );
}

export default RegisterSuccess;
