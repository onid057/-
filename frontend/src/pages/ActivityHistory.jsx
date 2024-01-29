import React from 'react';
import styled from 'styled-components';
import NavigationBar from '../components/common/NavigationBar';
import Image from '../components/common/Image';
import BoldText from '../components/common/BoldText';

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
  width: 288px;
  margin: 0 auto;
  padding: 0 16px;
  border-radius: 25px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function ActivityHistory() {
  // const [isVisible, setIsVisible] = useState(false);

  // const handleClick = () => {
  //   setIsVisible(!isVisible);
  // };

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
        <ContentWrapper key={idx}>{name}</ContentWrapper>
      ))}
    </Wrapper>
  );
}
export default ActivityHistory;
