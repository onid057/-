import styled from 'styled-components';

const HorizonLineWrapper = styled.hr`
  width: ${props => props.$width};
  height: ${props => props.$height};
  margin: ${props => (props.$margin ? props.$margin : 0)};
  background-color: ${props =>
    props.$lineColor ? props.$lineColor : '#d2d2d2'};
  border: 0;
`;

function HorizontalLine({ width, height, lineColor }) {
  return (
    <HorizonLineWrapper
      $width={width}
      $height={height}
      $lineColor={lineColor}
    ></HorizonLineWrapper>
  );
}

export default HorizontalLine;
