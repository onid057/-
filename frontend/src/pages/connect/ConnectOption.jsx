import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Paragraph from '../../components/common/Paragraph';
import Image from '../../components/common/Image';
import NavigationBar from '../../components/common/NavigationBar';
import NavigateButton from '../../components/common/NavigateButton';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

function ConnectOption() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <NavigationBar
        leftContent={
          <Image
            width="40px"
            height="40px"
            margin="0 0 0 -12px"
            src={process.env.PUBLIC_URL + '/images/left_arrow.svg'}
          ></Image>
        }
        onPrevious={() => navigate('/userMyPage')}
      ></NavigationBar>

      <Paragraph
        margin="0 0 20px 0"
        gap="5px"
        fontSize="35px"
        sentences={['계정', '연동하기']}
      ></Paragraph>

      <NavigateButton onClick={() => navigate('/connectAsCaptain')}>
        대표로 등록하기
      </NavigateButton>
      <NavigateButton>구성원으로 참여하기</NavigateButton>
    </Wrapper>
  );
}

export default ConnectOption;
