import styled from 'styled-components';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import Image from '../../components/common/Image';
import NavigateText from '../../components/common/NavigateText';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMatchNotificationByZipsa } from '../../apis/api/notify';

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

function SuggestByZipsa() {
  const { notificationId } = useParams();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    getMatchNotificationByZipsa(notificationId).then(response => {
      console.log(response);
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
            <BoldText boldContent={`{ ${detail.zipsaName} }`}></BoldText>,
            '집사님의 지원',
          ]}
        ></Paragraph>
        <Image
          src={process.env.PUBLIC_URL + '/images/finger.svg'}
          width="100px"
          height="100px"
        ></Image>
      </Title>

      <Content>
        <Paragraph
          gap="5px"
          fontSize="18px"
          sentences={[
            `공개방에서 ${detail.zipsaName} 님의 정보를`,
            '보고 꼼꼼하게 선택하세요!',
          ]}
        ></Paragraph>

        <NavigateText nextPage={-1}>공개방으로 이동하기</NavigateText>
      </Content>
    </Wrapper>
  );
}

export default SuggestByZipsa;
