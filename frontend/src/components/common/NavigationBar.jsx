import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftContent = styled.span`
  height: 24px;
  display: flex;
  align-items: center;
  text-align: left;
  cursor: pointer;
`;
const CenterContent = styled.span`
  text-align: center;
  line-height: 1.5em;
  display: inline-block;
  font-size: 16px;
`;
const RightContent = styled.span`
  text-align: right;
  line-height: 1.5em;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
`;

function NavigationBar({
  leftContent,
  centerContent,
  rightContent,
  onPrevious,
  onNext,
}) {
  return (
    <Wrapper>
      {leftContent && (
        <LeftContent onClick={onPrevious}>{leftContent}</LeftContent>
      )}
      {centerContent && <CenterContent>{centerContent}</CenterContent>}
      {rightContent && (
        <RightContent onClick={onNext}>{rightContent}</RightContent>
      )}
    </Wrapper>
  );
}

export default NavigationBar;
