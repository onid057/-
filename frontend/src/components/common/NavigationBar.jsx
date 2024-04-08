import styled from 'styled-components';

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LeftContent = styled.div`
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
const DisabledText = styled.span`
  color: #b0b8c0;
`;

function NavigationBar({
  leftContent,
  centerContent,
  rightContent,
  onPrevious,
  onNext,
  disabledOnNext,
}) {
  return (
    <Wrapper>
      {leftContent && (
        <LeftContent onClick={onPrevious}>{leftContent}</LeftContent>
      )}
      {centerContent && <CenterContent>{centerContent}</CenterContent>}
      {rightContent && (
        <RightContent onClick={!disabledOnNext ? onNext : undefined}>
          {disabledOnNext ? (
            <DisabledText>{rightContent}</DisabledText>
          ) : (
            rightContent
          )}
        </RightContent>
      )}
    </Wrapper>
  );
}

export default NavigationBar;
