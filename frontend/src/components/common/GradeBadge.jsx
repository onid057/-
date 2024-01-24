import React from 'react';
import { styled, css } from 'styled-components';

const Wrapper = styled.div`
  // default 스타일
  display: inline-block;
  width: ${props => (props.$width ? props.$width : '70px')};
  height: ${props => (props.$height ? props.$height : '18px')};
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: center;
  ${props =>
    props.grade === '1' &&
    css`
      background-image: url('/images/grade_1.svg');
    `}
  ${props =>
    props.grade === '2' &&
    css`
      background-image: url('/images/grade_2.svg');
    `}
  ${props =>
    props.grade === '3' &&
    css`
      background-image: url('/images/grade_3.svg');
    `}
  ${props =>
    props.grade === '4' &&
    css`
      background-image: url('/images/grade_4.svg');
    `}
  ${props =>
    props.grade === '5' &&
    css`
      background-image: url('/images/grade_5.svg');
    `}
`;

function GradeBadge({ grade, width, height }) {
  return <Wrapper grade={grade} $width={width} $height={height}></Wrapper>;
}

export default GradeBadge;
