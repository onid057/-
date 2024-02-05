import styled from 'styled-components';

const Wrapper = styled.div`
  width: ${props => (props.$width ? props.$width : '91px')};
  height: ${props => (props.$height ? props.$height : '27px')};
  padding: ${props => (props.$padding ? props.$padding : '3px 2px')};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dcf0f5;
  border-radius: ${props =>
    props.$borderRadius ? props.$borderRadius : '5px'};
  border: ${props => (props.$border ? props.$border : 'none')};
  font-size: ${props => (props.$fontSize ? props.$fontSize : '15px')};
  font-weight: ${props => (props.$fontWeight ? props.$fontWeight : '500')};
`;

function BoardsTags({ mode, tagName }) {
  switch (mode) {
    case 'LARGE':
      return (
        <Wrapper
          $width={'114px'}
          $height={'27px'}
          $padding={'5px 15px'}
          $borderRadius={'25px'}
          $border={'solid 0.5px #1c2064'}
        >
          {tagName}
        </Wrapper>
      );
    case 'MEDIUM':
      return <Wrapper $fontWeight={'400'}>{tagName}</Wrapper>;
    case 'SMALL':
      return (
        <Wrapper
          $width={'52px'}
          $height={'21px'}
          $fontSize={'11px'}
          $fontWeight={'350'}
        >
          {tagName}
        </Wrapper>
      );
  }
}

export default BoardsTags;
