import styled from 'styled-components';

const Wrapper = styled.div`
  cursor: ${props => (props.$cursor ? props.$cursor : 'none')};
  width: ${props => (props.$width ? props.$width : '91px')};
  height: ${props => (props.$height ? props.$height : '27px')};
  padding: ${props => (props.$padding ? props.$padding : '3px 2px')};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.$backgroundColor ? props.$backgroundColor : '#dcf0f5'};
  border-radius: ${props =>
    props.$borderRadius ? props.$borderRadius : '5px'};
  white-space: nowrap;
  border: ${props => (props.$border ? props.$border : 'none')};
  font-size: ${props => (props.$fontSize ? props.$fontSize : '15px')};
  font-weight: ${props => (props.$fontWeight ? props.$fontWeight : '500')};
  color: ${props => (props.color ? props.color : '#000000')};
`;

function BoardsTags({ mode, tagname, onClick }) {
  switch (mode) {
    case 'LARGE':
      return (
        <Wrapper
          $cursor={'pointer'}
          $width={'95px'}
          $height={'27px'}
          $padding={'5px 15px'}
          $borderRadius={'25px'}
          $border={'solid 0.5px #1c2064'}
          onClick={onClick}
        >
          {tagname}
        </Wrapper>
      );
    case 'LARGE_SELECTED':
      return (
        <Wrapper
          $cursor={'pointer'}
          $width={'114px'}
          $height={'27px'}
          $padding={'5px 15px'}
          $backgroundColor={'#629AF9'}
          $borderRadius={'25px'}
          $border={'solid 0.5px #629AF9'}
          $fontWeight={'400'}
          color={'#FFFFFF'}
          onClick={onClick}
        >
          {tagname}
        </Wrapper>
      );
    case 'MEDIUM':
      return <Wrapper $fontWeight={'400'}>{tagname}</Wrapper>;
    case 'SMALL':
      return (
        <Wrapper
          $width={'52px'}
          $height={'21px'}
          $fontSize={'11px'}
          $fontWeight={'350'}
          onClick={onClick}
        >
          {tagname}
        </Wrapper>
      );
  }
}

export default BoardsTags;
