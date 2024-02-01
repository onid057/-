import styled from 'styled-components';
import Image from './Image';

const ButtonWrapper = styled.button`
  cursor: pointer;
  width: 100%;
  height: 52px;
  border: none;
  border-radius: 25px;
  outline: none;
  color: #000000;
  font-size: 20px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const ThinButtonWrapper = styled(ButtonWrapper)`
  height: 38px;
  font-size: 17px;
`;
const ThickGrayButton = styled(ButtonWrapper)``;
const ThinGrayButton = styled(ThinButtonWrapper)``;
const ThickBlueButton = styled(ButtonWrapper)`
  color: #ffffff;
  background-color: #629af9;
`;
const ThinBlueButton = styled(ThinButtonWrapper)`
  color: #ffffff;
  background-color: #629af9;
`;
const ThickWhiteButton = styled(ButtonWrapper)`
  background-color: #ffffff;
`;
const ThinWhiteButton = styled(ThinButtonWrapper)`
  background-color: #ffffff;
`;
const ImageButton = styled(ButtonWrapper)`
  height: 45px;
  background-color: #ffffff;
  border-radius: 15px;
  font-size: 16px;
  border: 1px dashed #666666;
`;
const DiamondWhiteButton = styled(ThinButtonWrapper)`
  background-color: #ffffff;
`;
const DiamondBlueButton = styled(ThinButtonWrapper)`
  color: #ffffff;
  background-color: #629af9;
`;

function Button({ mode, onClick, children }) {
  switch (mode) {
    case 'THICK_GRAY':
      return <ThickGrayButton onCLick={onClick}>{children}</ThickGrayButton>;
    case 'THIN_GRAY':
      return <ThinGrayButton onCLick={onClick}>{children}</ThinGrayButton>;
    case 'THICK_BLUE':
      return <ThickBlueButton onCLick={onClick}>{children}</ThickBlueButton>;
    case 'THIN_BLUE':
      return <ThinBlueButton onCLick={onClick}>{children}</ThinBlueButton>;
    case 'THICK_WHITE':
      return <ThickWhiteButton onCLick={onClick}>{children}</ThickWhiteButton>;
    case 'THIN_WHITE':
      return <ThinWhiteButton onCLick={onClick}>{children}</ThinWhiteButton>;
    case 'IMAGE_UPLOAD':
      return (
        <ImageButton onCLick={onClick}>
          <Image
            src={`${process.env.PUBLIC_URL}/images/camera.svg`}
            width="24px"
            height="24px"
          />
          {children}
        </ImageButton>
      );
    case 'IMAGE_EDIT':
      return (
        <ImageButton onCLick={onClick}>
          <Image
            src={`${process.env.PUBLIC_URL}/images/edit.svg`}
            width="24px"
            height="24px"
          />
          {children}
        </ImageButton>
      );
    case 'DIAMOND_WHITE':
      return (
        <DiamondWhiteButton onCLick={onClick}>
          <Image
            src={`${process.env.PUBLIC_URL}/images/small_dia.svg`}
            width="29px"
            height="29px"
          />
          {children}
        </DiamondWhiteButton>
      );
    case 'DIAMOND_BLUE':
      return (
        <DiamondBlueButton onCLick={onClick}>
          <Image
            src={`${process.env.PUBLIC_URL}/images/small_dia.svg`}
            width="29px"
            height="29px"
          />
          {children}
        </DiamondBlueButton>
      );
  }
}

export default Button;
