import React from 'react';
import styled from 'styled-components';
import Paragraph from '../../components/common/Paragraph';
import NavigateText from '../../components/common/NavigateText';
import MenuBar from '../../components/common/MenuBar';
import { useUserInfo } from '../../hooks/useUserInfo';

const Wrapper = styled.div`
  width: 320px;
  margin: 0 auto;
  padding: 0 16px;
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
  gap: 30px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: start;
  margin: ${props => props.$margin || '0'};
  gap: 15px;
`;

const TextWrapper = styled.div`
  font-size: 18px;
`;

function CompletedCreationRoom() {
  const userState = useUserInfo(state => state.userState);

  return (
    <Wrapper>
      <HeadWrapper>
        <ContentWrapper $margin={'65px 0 0'}>
          <Paragraph
            fontSize={'35px'}
            sentences={['방 생성이', '완료되었습니다.']}
            gap={'10px'}
          ></Paragraph>
          <Paragraph
            fontSize={'15px'}
            sentences={['24시간이 지나면 방이 자동으로 삭제돼요.']}
          ></Paragraph>
        </ContentWrapper>
        <ContentWrapper>
          <Paragraph
            fontSize={'18px'}
            sentences={['모집 경과는', '아래에서 확인해 보세요.']}
            gap={'10px'}
          ></Paragraph>
        </ContentWrapper>
        <ContentWrapper>
          <NavigateText
            nextPage={'/rooms'}
            children={<TextWrapper>집사모집 목록 확인하기</TextWrapper>}
          ></NavigateText>
        </ContentWrapper>
      </HeadWrapper>
      <MenuBar isWorked={userState === 'ZIPSA'}></MenuBar>
    </Wrapper>
  );
}
export default CompletedCreationRoom;
