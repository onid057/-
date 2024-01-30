import React from 'react';
import styled from 'styled-components';
import NavigationBar from '../components/common/NavigationBar';
import Image from '../components/common/Image';
import BoldText from '../components/common/BoldText';
import Paragraph from '../components/common/Paragraph';
import Accordian from '../components/common/Accordian';

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

function ActivityHistory() {
  const userList = ['곽희웅', '이수민'];

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
      {userList.map((name, idx) => (
        <Accordian
          title={
            <Paragraph
              gap={'8px'}
              fontSize={'20px'}
              sentences={[
                <BoldText
                  fontSize={'20px'}
                  boldContent={`{ ${name} }`}
                  normalContent={' 집사와'}
                />,
                '함께한 기억이 있어요',
              ]}
            ></Paragraph>
          }
          content={
            <Paragraph
              gap={'8px'}
              fontSize={'20px'}
              sentences={[
                <BoldText
                  fontSize={'20px'}
                  boldContent={`{ ${name} }`}
                  normalContent={' 집사와'}
                />,
                '함께한 기억이 있어요',
              ]}
            ></Paragraph>
          }
          key={idx}
        ></Accordian>
      ))}
    </Wrapper>
  );
}
export default ActivityHistory;
