import styled from 'styled-components';
import Image from './Image';

const Wrapper = styled.span`
  cursor: ${props => (props.$disabled ? 'default' : 'pointer')};
  width: 100%;
  padding: 20px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => (props.$disabled ? '#d9d9d9' : '#ffffff')};
  border-radius: 25px;
`;

function NavigateButton({ onClick, children, disabled }) {
  return (
    <Wrapper onClick={onClick} $disabled={disabled}>
      {children}
      <Image
        src={
          process.env.PUBLIC_URL +
          (disabled ? '/images/simple_check.svg' : '/images/right_arrow.svg')
        }
        width={'24px'}
        height={'24px'}
      ></Image>
    </Wrapper>
  );
}

export default NavigateButton;
