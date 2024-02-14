import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAssociationAsLeader } from '../../apis/api/associate';
import styled from 'styled-components';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import Image from '../../components/common/Image';
import NavigationBar from '../../components/common/NavigationBar';
import Button from '../../components/common/Button';
import CheckButton from '../../components/common/CheckButton';

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

function ConnectAsLeader() {
  const [isFirstConditionAgreed, setIsFirstConditionAgreed] = useState(false);
  const [isSecondConditionAgreed, setIsSecondConditionAgreed] = useState(false);
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
        onPrevious={() => navigate('/connectOption')}
      ></NavigationBar>

      <Paragraph
        margin="0 0 80px 0"
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText
            boldContent={'그룹의 대표'}
            normalContent={'로'}
          ></BoldText>,
          '가입하시겠어요?',
        ]}
      ></Paragraph>

      <CheckButton
        isChecked={isFirstConditionAgreed}
        onClick={() => setIsFirstConditionAgreed(prev => !prev)}
      >
        개인정보 제 3자 제공 동의
      </CheckButton>
      <CheckButton
        isChecked={isSecondConditionAgreed}
        onClick={() => setIsSecondConditionAgreed(prev => !prev)}
      >
        결제 수단 공유 동의
      </CheckButton>
      <Button
        mode={
          isFirstConditionAgreed && isSecondConditionAgreed
            ? 'THICK_BLUE'
            : 'THICK_GRAY'
        }
        onClick={
          isFirstConditionAgreed && isSecondConditionAgreed
            ? async () => {
                await createAssociationAsLeader().then(response =>
                  console.log(response),
                );
                navigate('/connectCode/show');
              }
            : undefined
        }
      >
        가입하기
      </Button>
    </Wrapper>
  );
}

export default ConnectAsLeader;
