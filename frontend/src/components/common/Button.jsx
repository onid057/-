import React from 'react';
import { styled, css } from 'styled-components';

const ButtonWrapper = styled.button`
  // 공통 스타일
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 25px;
  color: white;
  padding: auto;
  width: 288px;
  height: 57px;
  font-size: 20px;
  ${props =>
    props.mode === 'SMALL' &&
    css`
      width: 138px;
      font-size: 20px;
      font-weight: bold;
    `};
  ${props =>
    props.mode === 'NORMAL_GRAY' &&
    css`
      font-size: 17px;
      color: black;
    `};
  ${props =>
    props.mode === 'NORMAL_BLUE' &&
    css`
      font-size: 17px;
    `};
  ${props =>
    props.mode === 'SMALL_WHITE' &&
    css`
      width: 138px;
      font-size: 18px;
      color: black;
      background-color: white;
    `};
  ${props =>
    props.mode === 'THIN_WHITE' &&
    css`
      width: 100%;
      height: 38px;
      color: black;
      font-size: 17px;
      background-color: white;
      opacity: 0.9;
    `};
  ${props =>
    props.mode === 'FULL_PERCENT_WHITE' &&
    css`
      width: 100%;
      height: 38px;
      font-size: 14px;
      color: black;
      background-color: ${props => (props.bgcolor ? props.bgcolor : 'white')};
    `};
  ${props =>
    props.mode === 'INSIDE_IMAGE' &&
    css`
      width: 100%;
      height: 38px;
      flex: 1;
      font-size: 14px;
      color: black;
      background-color: white;
    `};
  ${props =>
    (props.mode === 'IMAGE_UPLOAD') | (props.mode === 'IMAGE_EDIT') &&
    css`
      border-radius: 10px;
      font-size: 16px;
      color: black;
      border: 1px solid #629af9;
      height: 45px;
    `};

  ${props => {
    const color = props.color;
    return css`
      background-color: ${color};
    `;
  }}
`;

const ContentWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ImgContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  > img {
    width: 25px;
    height: 25px;
  }
`;

function Button({ msg, color, mode, onClick, ...rest }) {
  if (mode === 'IMAGE_UPLOAD') {
    return (
      <ButtonWrapper color={color} mode={mode} onClick={onClick} {...rest}>
        <ContentWrapper>
          <img
            src={`${process.env.PUBLIC_URL}/images/camera.svg`}
            alt="camera"
          />
          {msg}
        </ContentWrapper>
      </ButtonWrapper>
    );
  } else if (mode === 'IMAGE_EDIT') {
    return (
      <ButtonWrapper color={color} mode={mode} onClick={onClick} {...rest}>
        <ContentWrapper>
          <img src={`${process.env.PUBLIC_URL}/images/edit.svg`} alt="edit" />
          {msg}
        </ContentWrapper>
      </ButtonWrapper>
    );
  } else if (mode === 'INSIDE_IMAGE') {
    return (
      <ButtonWrapper color={color} mode={mode} onClick={onClick} {...rest}>
        <ImgContentWrapper>
          <img
            src={`${process.env.PUBLIC_URL}/images/small_dia.svg`}
            alt="dia"
          />
          {msg}
        </ImgContentWrapper>
      </ButtonWrapper>
    );
  } else {
    return (
      <ButtonWrapper color={color} mode={mode} onClick={onClick} {...rest}>
        {msg}
      </ButtonWrapper>
    );
  }
}

export default Button;
