import React from 'react';
import { styled, css } from 'styled-components';

const ButtonWrapper = styled.button`
  // 공통 스타일
  outline: none;
  border: none;
  border-radius: 25px;
  color: white;
  cursor: pointer;
  padding: auto;
  width: 294px;
  height: 57px;
  font-size: 20px /* 크기 설정*/
    ${props =>
      props.mode === 'SMALL' &&
      css`
        width: 138px;
        font-size: 20px;
        font-weight: bold;
      `};
  ${props =>
    (props.mode === 'IMAGE_UPLOAD') | (props.mode === 'IMAGE_EDIT') &&
    css`
      border-radius: 10px;
      font-size: 16px;
      color: black;
      border: 1px solid #629af9;
    `};
  ${props =>
    props.mode === 'NORMAL_GRAY' &&
    css`
      width: 294px;
      height: 57px;
      font-size: 17px;
      color: black;
    `};

  ${props => {
    const color = props.color;
    return css`
      background-color: ${color};
    `;
  }}
`;

function Button({ msg, color, mode, ...rest }) {
  if (mode === 'IMAGE_UPLOAD') {
    return (
      <ButtonWrapper color={color} mode={mode} {...rest}>
        <img src={`${process.env.PUBLIC_URL}/images/camera.svg`} alt="camera" />
        {msg}
      </ButtonWrapper>
    );
  } else if (mode === 'IMAGE_EDIT') {
    return (
      <ButtonWrapper color={color} mode={mode} {...rest}>
        <img src={`${process.env.PUBLIC_URL}/images/edit.svg`} alt="edit" />
        {msg}
      </ButtonWrapper>
    );
  } else {
    <ButtonWrapper color={color} mode={mode} {...rest}>
      {msg}
    </ButtonWrapper>;
  }
}

export default Button;
