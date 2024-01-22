import { styled } from 'styled-components';

const ImageWrapper = styled.div`
  width: ${props => props.$width};
  height: ${props => props.$height};
  margin: ${props => (props.$margin ? props.$margin : 'inherit')};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url(${props => props.$src});
`;

function Image({ src, width, height, margin }) {
  return (
    <ImageWrapper
      $src={src}
      $width={width}
      $height={height}
      $margin={margin}
    ></ImageWrapper>
  );
}

export default Image;
