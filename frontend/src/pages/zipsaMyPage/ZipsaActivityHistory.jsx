import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import Paragraph from '../../components/common/Paragraph';
import Accordian from '../../components/common/Accordian';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0px 16px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  font-weight: 300;
  white-space: pre-wrap;
`;

function ZipsaActivityHistory() {
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

      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={['나의', '집사 활동 내역']}
      ></Paragraph>

      <Accordian title={'제목데스'} content={'내용데스'}></Accordian>
    </Wrapper>
  );
}

export default ZipsaActivityHistory;
