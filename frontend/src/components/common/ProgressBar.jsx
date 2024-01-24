import { styled } from 'styled-components';

const ProgressBarWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const BarGage = styled.progress`
  width: 100%;
  height: 16px;
  appearance: none;
  &::-webkit-progress-bar {
    background: #dcf0f5;
    border-radius: 12px;
    border: 1px solid #eeeeee;
    overflow: hidden;
  }
  &::-webkit-progress-value {
    background: #629af9;
    border-radius: 0px;
  }
`;

function ProgressBar({ value }) {
  return (
    <ProgressBarWrapper>
      <BarGage value={value} max={100}></BarGage>
    </ProgressBarWrapper>
  );
}

export default ProgressBar;
