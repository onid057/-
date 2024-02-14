import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BoldText from '../components/common/BoldText';
import Paragraph from '../components/common/Paragraph';
import Button from '../components/common/Button';
import NavigationBar from '../components/common/NavigationBar';
import Image from '../components/common/Image';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px 60px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #0093e9;
  background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const OptionWrapper = styled.div`
  margin: 80px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

function MatchOption() {
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
        onPrevious={() => navigate('/')}
      ></NavigationBar>

      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText boldContent="어떤 방식" normalContent="으로"></BoldText>,
          '집사님을',
          '찾고 계신가요?',
        ]}
      ></Paragraph>

      <OptionWrapper>
        <Button mode={'THIN_WHITE'} onClick={() => navigate('/map')}>
          지도에서 빠르게 찾아볼래요!
        </Button>
        <Button mode={'THIN_WHITE'} onClick={() => navigate('/filter')}>
          조건이 맞는 집사님을 찾고 있어요.
        </Button>
        <Button mode={'THIN_WHITE'} onClick={() => navigate('/rooms/create')}>
          집사님을 모집해보고 싶어요~
        </Button>
      </OptionWrapper>
    </Wrapper>
  );
}

export default MatchOption;
