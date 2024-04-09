import styled from 'styled-components';
import Paragraph from '../../components/common/Paragraph';
import BoldText from '../../components/common/BoldText';
import Image from '../../components/common/Image';
import MenuBar from '../../components/common/MenuBar';
import { useUserInfo } from '../../hooks/useUserInfo';

const Wrapper = styled.div`
  width: 320px;
  margin: 0 auto;
  padding: 40px 16px 0 16px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const HeadWrapper = styled.div`
  width: 100%;
  min-height: 509px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const HeartWrapper = styled.div`
  width: 100%;
  height: 288px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background-color: #ffffff;
`;

export default function ReportComplete() {
  const userState = useUserInfo(state => state.userState);

  return (
    <Wrapper>
      <HeadWrapper>
        <Paragraph
          gap={'5px'}
          fontSize={'35px'}
          sentences={[
            <BoldText
              boldContent={'보고서 작성'}
              normalContent={'을'}
            ></BoldText>,
            '완료했어요!',
          ]}
        ></Paragraph>

        <HeartWrapper>
          <Image
            src={`${process.env.PUBLIC_URL}/images/heart.svg`}
            width={'150px'}
            height={'150px'}
          ></Image>
          <Paragraph
            gap={'5px'}
            fontSize={'15px'}
            sentences={['고객님이 집사님을', '더욱 믿고 맡기실 수 있어요!']}
            textAlign={'center'}
          ></Paragraph>
        </HeartWrapper>
      </HeadWrapper>
      <MenuBar isWorked={userState === 'ZIPSA'}></MenuBar>
    </Wrapper>
  );
}
