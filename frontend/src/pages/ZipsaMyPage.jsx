import styled from 'styled-components';
import Image from '../components/common/Image';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 60px 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  font-weight: 300;
  white-space: pre-wrap;
`;

function ZipsaMyPage() {
  return (
    <Wrapper>
      <Image
        src={`${process.env.PUBLIC_URL}/images/room_1.svg`}
        width={'150px'}
        height={'150px'}
      ></Image>
    </Wrapper>
  );
}

export default ZipsaMyPage;
