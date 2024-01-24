import { useState } from 'react';
import styled, { css } from 'styled-components';

export default function Ref() {
  const [isChecked, setIsChecked] = useState(false);

  const onClickCheck = () => {
    setIsChecked(!isChecked);
    console.log(!isChecked);
  };

  return (
    <>
      <SCustomCheckboxWrapper>
        <SCustomCheckbox type="checkbox" isChecked={isChecked} />
        <SCustomLabel onClick={onClickCheck} isChecked={isChecked} />
      </SCustomCheckboxWrapper>
    </>
  );
}

const SCustomCheckboxWrapper = styled.div`
  position: relative;
`;

const SCustomCheckbox = styled.input`
  visibility: hidden;
  ${({ isChecked }) =>
    isChecked
      ? css`
          background-color: #629af9;
          border-color: #629af9;
          &:after: {
            opacity: 1;
          }
        `
      : null}
`;

const SCustomLabel = styled.label`
  background-color: #ccc;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  width: 28px;
  height: 28px;
  position: absolute;
  left: 0;
  top: 0;
  ${({ isChecked }) =>
    isChecked
      ? css`
          background-color: #629af9;
          border-color: #629af9;
          &:after {
            border: 2px solid #fff;
            border-top: none;
            border-right: none;
            content: '';
            height: 6px;
            left: 7px;
            position: absolute;
            top: 8px;
            transform: rotate(-45deg);
            width: 12px;
          }
        `
      : css`
          background-color: #f4f4f4 !important;
          &:after {
            opacity: 1;
          }
        `}
`;
