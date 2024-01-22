import { styled } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: ${props => (props.$fontSize ? props.$fontSize : 'inherit')};
`;

const BoldTextWrapper = styled.div`
  font-weight: 600;
`;

function BoldText({ fontSize, BoldContent, NormalContent }) {
  return (
    <Wrapper $fontSize={fontSize}>
      <BoldTextWrapper>{BoldContent}</BoldTextWrapper>
      <>{NormalContent}</>
    </Wrapper>
  );
}

export default BoldText;
