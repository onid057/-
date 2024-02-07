import styled from 'styled-components';
import Image from './Image';

const Wrapper = styled.span`
  cursor: pointer;
  width: 100%;
  padding: 20px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-radius: 25px;
`;

function NavigateButton({ onClick, children }) {
  return (
    <Wrapper onClick={onClick}>
      {children}
      <Image
        src={process.env.PUBLIC_URL + '/images/right_arrow.svg'}
        width={'24px'}
        height={'24px'}
      ></Image>
    </Wrapper>
  );
}

export default NavigateButton;
