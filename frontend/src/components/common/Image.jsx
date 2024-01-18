import { styled } from 'styled-components';

const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url(${props => props.$src});
`;

function Image({ src }) {
  return <ImageWrapper $src={src}></ImageWrapper>;
}

export default Image;
