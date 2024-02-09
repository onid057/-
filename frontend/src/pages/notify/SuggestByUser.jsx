import styled from 'styled-components';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import Image from '../../components/common/Image';
import Button from '../../components/common/Button';
import MatchInfo from '../../components/common/MatchInfo';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getMatchNotificationByUser,
  rejectSuggestionByUser,
  allowSuggestionByUser,
} from '../../apis/api/notify';

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
  width: 288px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div`
  width: 288px;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

function SuggestByUser() {
  const { notificationId } = useParams();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    getMatchNotificationByUser(notificationId).then(response => {
      setDetail(response.data);
    });
  }, []);

  return (
    <Wrapper>
      <Title>
        <Paragraph
          gap="5px"
          fontSize="30px"
          sentences={[
            <BoldText boldContent={`{ ${detail.userName} }`}></BoldText>,
            '고객님의 제안',
          ]}
        ></Paragraph>
        <Image
          src={process.env.PUBLIC_URL + '/images/finger.svg'}
          width="100px"
          height="100px"
        ></Image>
      </Title>

      <Content>
        <MatchInfo
          mode={'SUGGEST'}
          majorCategoryName={detail.majorCategoryName}
          userName={detail.userName}
          expectationStartedAt={detail.expectationStartedAt}
          expectationEndedAt={detail.expectationEndedAt}
          expectationPay={detail.expectationPay}
          content={detail.content}
        ></MatchInfo>

        <Paragraph
          gap="5px"
          fontSize="18px"
          sentences={['고객님과 함께 하시기로', '했다면 결정을 내려주세요!']}
        ></Paragraph>

        <ButtonWrapper>
          <Button
            mode={'THICK_BLUE'}
            onClick={() =>
              allowSuggestionByUser(notificationId).then(response =>
                console.log(response),
              )
            }
          >
            수락
          </Button>
          <Button
            mode={'THICK_GRAY'}
            onClick={() =>
              rejectSuggestionByUser(notificationId).then(response =>
                console.log(response),
              )
            }
          >
            거절
          </Button>
        </ButtonWrapper>
      </Content>
    </Wrapper>
  );
}

export default SuggestByUser;
