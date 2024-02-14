import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import ProgressBar from '../../components/common/ProgressBar';
import LongInputBox from '../../components/common/LongInputBox';

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

function InsertZipsaInfo() {
  const [detail, setDetail] = useState('');
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
        rightContent="다음"
        onPrevious={() => navigate(-1)}
        disabledOnNext={!detail}
      ></NavigationBar>

      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText boldContent="상세 내용" normalContent="을"></BoldText>,
          '적어주세요',
        ]}
      ></Paragraph>

      <ProgressBar value={20}></ProgressBar>

      <LongInputBox
        value={detail}
        placeholder={
          '집사와 함께 했으면 하는 일이나 맡기고 싶은 일을 자세하게 적어주세요!'
        }
        onChange={event => setDetail(event.target.value)}
      ></LongInputBox>
    </Wrapper>
  );
}

export default InsertZipsaInfo;
