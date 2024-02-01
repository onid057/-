import { styled } from 'styled-components';

import Notice from '../../components/common/Notice';
import Image from '../../components/common/Image';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 15px 13px;
  display: flex;
  flex-direction: column;
  gap: 11px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

function NotificationPage() {
  return (
    <Wrapper>
      <Notice
        upper={[
          <Image
            src={process.env.PUBLIC_URL + '/images/light.svg'}
            width="40px"
            height="40px"
          ></Image>,
          <BoldText
            fontSize="20px"
            boldContent="{ 곽희웅 }"
            normalContent=" 고객님이"
          ></BoldText>,
          <Image
            src={process.env.PUBLIC_URL + '/images/right_arrow.svg'}
            width="24px"
            height="24px"
          ></Image>,
        ]}
        lower={[
          <Paragraph
            gap="5px"
            fontSize="18px"
            sentences={[
              <BoldText
                boldContent="[ 강아지 산책 ]"
                normalContent=" 을"
              ></BoldText>,
              '요청하셨어요!',
            ]}
          ></Paragraph>,
        ]}
        nextPage="/fail"
      ></Notice>
    </Wrapper>
  );
}

export default NotificationPage;
