import React from 'react';
import styled from 'styled-components';
import Notice from '../components/common/Notice';
import Image from '../components/common/Image';
import BoldText from '../components/common/BoldText';
import Paragraph from '../components/common/Paragraph';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const ContentWrapper = styled.div`
  width: ${props => props.width || '200px'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function MyPage({ name }) {
  const MenuList = [
    '사용 내역 보기',
    '작성한 게시물 확인하기',
    '간편 결제 수단 등록하기',
    '본인 인증하기',
    '집사 되기',
    '비밀번호 변경하기',
  ];

  return (
    <Wrapper>
      <Notice
        upper={[
          <Image
            src={process.env.PUBLIC_URL + '/images/profile_img.svg'}
            width={'60px'}
            height={'60px'}
            margin={'0'}
          ></Image>,
          <Paragraph
            gap={'20px'}
            fontSize={'13px'}
            sentences={[
              <BoldText
                fontSize={'20px'}
                boldContent={name}
                normalContent={' 사용자님'}
              ></BoldText>,
              '내 정보 수정하기',
            ]}
          ></Paragraph>,
        ]}
        lower={null}
        nextPage={'/'}
        padding={'11px 12px'}
      ></Notice>
      <Notice
        upper={[
          <Image
            src={process.env.PUBLIC_URL + '/images/family.svg'}
            width={'40px'}
            height={'40px'}
            margin={'0'}
          ></Image>,
          <ContentWrapper width="">
            <BoldText
              fontSize={'20px'}
              boldContent={'가족 계정 만들기'}
              normalContent={null}
            ></BoldText>
            <Image
              src={process.env.PUBLIC_URL + '/images/right_arrow.svg'}
              width={'24px'}
              height={'24px'}
              margin={'0'}
            ></Image>
          </ContentWrapper>,
        ]}
        lower={null}
        nextPage={'/'}
        padding={'20px 12px'}
      ></Notice>
      {MenuList.map((content, idx) => (
        <Notice
          key={idx}
          upper={[
            <ContentWrapper width="270px">
              <BoldText
                fontSize={'18px'}
                boldContent={null}
                normalContent={content}
              ></BoldText>
              <Image
                src={process.env.PUBLIC_URL + '/images/right_arrow.svg'}
                width={'24px'}
                height={'24px'}
                margin={'0'}
              ></Image>
            </ContentWrapper>,
          ]}
          lower={null}
          nextPage={'/'}
          padding={'20px 12px'}
        ></Notice>
      ))}
    </Wrapper>
  );
}

export default MyPage;
