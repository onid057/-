import { styled } from 'styled-components';

const ProgressBarWrapper = styled.div`
  width: 100%;
  margin: 20px 0;
  display: flex;
  align-items: center;
`;

const BarGage = styled.progress`
  width: 100%;
  height: 14px;
  appearance: none;
  &::-webkit-progress-bar {
    background: #dcf0f5;
    border-radius: 12px;
    border: none;
    overflow: hidden;
  }
  &::-webkit-progress-value {
    background: #629af9;
    border-radius: 12px;
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
