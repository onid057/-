import { styled } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: ${props => (props.$fontSize ? props.$fontSize : 'inherit')};
`;

const BoldTextWrapper = styled.div`
  font-weight: 600;
`;

function BoldText({ fontSize, boldContent, normalContent }) {
  return (
    <Wrapper $fontSize={fontSize}>
      <BoldTextWrapper>{boldContent}</BoldTextWrapper>
      <>{normalContent}</>
    </Wrapper>
  );
}

export default BoldText;
