import { styled } from 'styled-components';

const ProgressBarWrapper = styled.div`
  box-sizing: border-box;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const BarText = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
`;

// 1번 필터에서는 LeftTextBox가 출력되지 않았으면 좋겠습니다.
const LeftTextBox = styled.div`
  display: flex;
  align-items: center;
`;

// 6번 필터에서는 RightTextBox가 출력되지 않았으면 좋겠습니다.
const RightTextBox = styled.div`
  display: flex;
  align-items: center;
`;

const LeftArrow = styled.div`
  width: 12px;
  height: 8px;
  background-image: url('/images/left_arrow_no_tail.svg');
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: center;
`;

const RightArrow = styled.div`
  width: 12px;
  height: 8px;
  background-image: url('/images/right_arrow_no_tail.svg');
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: center;
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

function ProgressBar() {
  return (
    <ProgressBarWrapper>
      <BarText>
        <LeftTextBox>
          <LeftArrow></LeftArrow>
          <span>이전</span>
        </LeftTextBox>
        <RightTextBox>
          <span>다음</span>
          <RightArrow></RightArrow>
        </RightTextBox>
      </BarText>

      {/* 아래 value 값에 따라 진척률이 변경됩니다. */}
      <BarGage value={20} max={100}></BarGage>
    </ProgressBarWrapper>
  );
}

export default ProgressBar;
