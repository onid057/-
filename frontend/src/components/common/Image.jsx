import { styled } from 'styled-components';

const ImageWrapper = styled.div`
  width: ${props => props.$width};
  height: ${props => props.$height};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url(${props => props.$src});
`;

function Image({ src, width, height }) {
  return (
    <ImageWrapper $src={src} $width={width} $height={height}></ImageWrapper>
  );
}

export default Image;
