import styled from 'styled-components';
import Image from './Image';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

function CheckButton({ isChecked, onClick, children }) {
  return (
    <Wrapper>
      <Image
        width="30px"
        height="30px"
        margin="2px 0 0 0"
        src={
          process.env.PUBLIC_URL +
          (isChecked ? '/images/check.svg' : '/images/uncheck.svg')
        }
        onClick={onClick}
      ></Image>
      {children}
    </Wrapper>
  );
}

export default CheckButton;
