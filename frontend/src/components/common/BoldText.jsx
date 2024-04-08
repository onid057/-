import { styled } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: ${props => (props.$fontSize ? props.$fontSize : 'inherit')};
  word-break: keep-all;
`;

const BoldTextWrapper = styled.div`
  font-weight: 500;
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
