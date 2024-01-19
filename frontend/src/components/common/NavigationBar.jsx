import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  margin: 0 auto 50px;
`;

const LeftContent = styled.span`
  flex: 1;
  height: 24px;
  display: flex;
  align-items: center;
  text-align: left;
  cursor: pointer;
`;
const CenterContent = styled.span`
  flex: 4;
  text-align: center;
  line-height: 1.5em;
  display: inline-block;
  font-size: 16px;
`;
const RightContent = styled.span`
  flex: 1;
  text-align: right;
  line-height: 1.5em;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
`;

function NavigationBar({ leftContent, centerContent, rightContent }) {
  return (
    <Wrapper>
      {leftContent && <LeftContent>{leftContent}</LeftContent>}
      {centerContent && <CenterContent>{centerContent}</CenterContent>}
      {rightContent && <RightContent>{rightContent}</RightContent>}
    </Wrapper>
  );
}

export default NavigationBar;
