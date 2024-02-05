import styled from 'styled-components';
import { forwardRef } from 'react';
import Image from './Image';

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 320px;
  height: ${props => (props.open ? '300px' : '0')};
  overflow: hidden;
  transition: height 1s ease;
  display: flex;
  flex-direction: column;
  gap: 11px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 25px 25px 0 0;
  z-index: 9999;
`;

const Header = styled.div`
  width: 320px;
  padding: 21px 23px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BottomSheet = forwardRef(({ open, title, children, onClick }, ref) => {
  return (
    <Wrapper open={open} ref={ref}>
      <Header>
        <>{title}</>
        <Image
          src={`${process.env.PUBLIC_URL}/images/x.svg`}
          width="18px"
          height="18px"
          onClick={onClick}
        />
      </Header>

      {children}
    </Wrapper>
  );
});

export default BottomSheet;
