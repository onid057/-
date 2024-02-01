import { styled } from 'styled-components';

const ImageWrapper = styled.div`
  position: relative;
  width: ${props => props.$width};
  height: ${props => props.$height};
  margin: ${props => (props.$margin ? props.$margin : '0')};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url(${props => props.$src});
  border: ${props => (props.$needBorder ? '1px dashed #666666' : 'none')};
  border-radius: ${props => props.$needBorder && '10px'};
  background-color: ${props => props.$needBorder && '#ffffff'};
`;

const DeleteButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: -10px;
  right: -10px;
  z-index: 9999;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background-image: url(${props => props.$url});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  border: none;
`;

function Image({ src, width, height, margin, onDelete }) {
  const isOnDelete = !!onDelete;

  return (
    <ImageWrapper
      $src={src}
      $width={width}
      $height={height}
      $margin={margin}
      $needBorder={isOnDelete}
    >
      {isOnDelete && (
        <DeleteButton
          $url={`${process.env.PUBLIC_URL}/images/closebutton.svg`}
          onClick={onDelete}
        ></DeleteButton>
      )}
    </ImageWrapper>
  );
}

export default Image;
