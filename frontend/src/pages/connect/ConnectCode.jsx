import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import Image from '../../components/common/Image';
import NavigationBar from '../../components/common/NavigationBar';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

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
const SubmitWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

function ConnectCode() {
  const { option } = useParams();
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
        onPrevious={() => navigate('/connectMember')}
      ></NavigationBar>

      <Paragraph
        margin="0 0 50px 0"
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText boldContent={'연동 코드'} normalContent={'를'}></BoldText>,
          '전달해주세요.',
        ]}
      ></Paragraph>

      {option === 'insert' && (
        <SubmitWrapper>
          <Input
            type="text"
            width={'190px'}
            placeholder="연동 코드를 입력하세요."
          ></Input>
          <Button mode="THIN_BLUE">입력</Button>
        </SubmitWrapper>
      )}
      {option === 'show' && (
        <SubmitWrapper>
          <Input
            type="text"
            value={'dcefghij'}
            width={'190px'}
            disabled
          ></Input>
          <Button mode="THIN_BLUE">복사</Button>
        </SubmitWrapper>
      )}
    </Wrapper>
  );
}

export default ConnectCode;
