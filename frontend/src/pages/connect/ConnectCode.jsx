import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  createAssociationCode,
  associateWithCode,
} from '../../apis/api/associate';
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
  const [code, setCode] = useState('');
  const [leftTime, setLeftTime] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (option === 'show') {
      createAssociationCode().then(response => {
        setCode(response.data.additionCode);
        setLeftTime(response.data.leftTime);
      });
    }
  }, []);

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
        onPrevious={() => navigate('/myPage')}
      ></NavigationBar>

      <Paragraph
        margin="0 0 50px 0"
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText boldContent={'연동 코드'} normalContent={'를'}></BoldText>,
          option === 'insert' ? '입력해요.' : '지인에게 전달해요.',
        ]}
      ></Paragraph>

      {option === 'insert' && (
        <SubmitWrapper>
          <Input
            type="text"
            width={'190px'}
            placeholder="연동 코드 8자리를 입력하세요."
            onChange={event => setInputValue(event.target.value)}
          ></Input>
          <Button
            mode="THIN_BLUE"
            onClick={async () => {
              await associateWithCode(inputValue)
                .then(response => {
                  if (response.status === 201) alert('연동 성공!');
                })
                .catch(() => alert('연동 코드 틀림!'));
              navigate('/myPage');
            }}
          >
            입력
          </Button>
        </SubmitWrapper>
      )}
      {option === 'show' && (
        <Input
          type="text"
          value={code}
          width={'190px'}
          margin={'10px 0 0 0'}
          commentText={`남은 시간 : ${Math.floor(leftTime / 60)}분 ${leftTime % 60}초`}
          disabled
        ></Input>
      )}
    </Wrapper>
  );
}

export default ConnectCode;
