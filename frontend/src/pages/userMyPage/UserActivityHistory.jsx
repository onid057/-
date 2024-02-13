import React from 'react';
import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import Accordian from '../../components/common/Accordian';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const DetailContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
`;

function UserActivityHistory() {
  const userList = [
    { name: '곽희웅', date: '2024.01.10', job: '영어 과외', pay: '20000' },
    { name: '이수민', date: '2024.01.12', job: '수학 과외', pay: '30000' },
  ];

  const detailInfo = [
    { label: '일시', key: 'date' },
    { label: '맡긴 일', key: 'job' },
    { label: '지불한 금액', key: 'pay' },
  ];

  return (
    <Wrapper>
      <NavigationBar
        leftContent={
          <Image
            src={`${process.env.PUBLIC_URL}/images/keyboard_arrow_left.svg`}
            width={'40px'}
            height={'40px'}
            margin={'0 0 0 -12px'}
          ></Image>
        }
      ></NavigationBar>
      <BoldText fontSize={'35px'} normalContent={'나의 사용 내역'}></BoldText>
      {userList.map((user, idx) => (
        <Accordian
          title={
            <Paragraph
              gap={'8px'}
              fontSize={'20px'}
              sentences={[
                <BoldText
                  fontSize={'20px'}
                  boldContent={`{ ${user.name} }`}
                  normalContent={' 집사와'}
                />,
                '함께한 기억이 있어요',
              ]}
            ></Paragraph>
          }
          content={
            <ContentWrapper>
              {detailInfo.map((info, idx) => (
                <DetailContentWrapper key={idx}>
                  {info.label}
                  <BoldText
                    fontSize={'16px'}
                    boldContent={user[info.key]}
                    normalContent={null}
                  ></BoldText>
                </DetailContentWrapper>
              ))}
            </ContentWrapper>
          }
          key={idx}
        ></Accordian>
      ))}
    </Wrapper>
  );
}
export default UserActivityHistory;
