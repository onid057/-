import styled from 'styled-components';

const HorizonLineWrapper = styled.hr`
  width: 100%;
  height: ${props => props.$height};
  margin-top: ${props => (props.$marginTop ? props.$marginTop : '0')};
  margin-bottom: ${props => (props.$marginBottom ? props.$marginBottom : '0')};
  background-color: ${props =>
    props.$lineColor ? props.$lineColor : '#d2d2d2'};
  border: 0;
`;

function HorizontalLine({ marginTop, marginBottom, height, color }) {
  return (
    <HorizonLineWrapper
      $marginTop={marginTop}
      $marginBottom={marginBottom}
      $height={height}
      $lineColor={color}
    ></HorizonLineWrapper>
  );
}

export default HorizontalLine;
