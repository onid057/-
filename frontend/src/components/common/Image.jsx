import { styled } from 'styled-components';

const ImageWrapper = styled.div`
  width: ${props => props.$width};
  height: ${props => props.$height};
  margin: ${props => (props.$margin ? props.$margin : 'inherit')};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url(${props => props.$src});
  position: relative;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 999;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background-image: url(${props => props.$url});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
`;

function Image({ src, width, height, margin, onDelete }) {
  const CloseUrl = `${process.env.PUBLIC_URL}/images/closebutton.svg`;
  return (
    <ImageWrapper $src={src} $width={width} $height={height} $margin={margin}>
      {onDelete ? (
        <DeleteButton $url={CloseUrl} onClick={onDelete}></DeleteButton>
      ) : null}
    </ImageWrapper>
  );
}

export default Image;
