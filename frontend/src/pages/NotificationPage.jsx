import { styled } from 'styled-components';

import Notice from '../components/common/Notice';
import Image from '../components/common/Image';
import BoldText from '../components/common/BoldText';
import Paragraph from '../components/common/Paragraph';

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
            src={process.env.PUBLIC_URL + '/images/lightning.svg'}
            width="40px"
            height="40px"
          ></Image>,
          <BoldText
            fontSize="20px"
            BoldContent="{ 이수민 }"
            NormalContent="집사님이"
          ></BoldText>,
        ]}
        lower={[
          <Paragraph
            gap="5px"
            sentences={[
              <BoldText
                BoldContent="[ 강아지 산책 ]"
                NormalContent="을"
              ></BoldText>,
              '맡아주시겠다고 요청이 왔어요!',
            ]}
          ></Paragraph>,
        ]}
        nextPage="/fail"
      ></Notice>

      <Notice
        upper={[
          <Image
            src={process.env.PUBLIC_URL + '/images/light.svg'}
            width="40px"
            height="40px"
          ></Image>,
          <BoldText
            fontSize="20px"
            BoldContent="{ 곽희웅 }"
            NormalContent="집사님이"
          ></BoldText>,
        ]}
        lower={[
          <Paragraph
            gap="5px"
            sentences={[
              <BoldText
                BoldContent="닭갈비 요리"
                NormalContent="를"
              ></BoldText>,
              '맡아주시겠다고 요청이 왔어요!',
            ]}
          ></Paragraph>,
        ]}
        nextPage="/fail"
      ></Notice>
    </Wrapper>
  );
}

export default NotificationPage;
