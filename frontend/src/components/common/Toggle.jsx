import { changeUserState } from '../../apis/api/toggle';
// import { useUserInfo } from '../../hooks/useUserInfo.js';
import styled from 'styled-components';

const ToggleWrapper = styled.div`
  position: relative;
  cursor: pointer;
  font-weight: 400;

  > .toggle-wrapper {
    width: 100%;
    height: 56px;
    border-radius: 25px;
    background-color: #b0b8c0;
  }

  > .toggle--checked {
    background-color: #0093e9;
    background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
    transition: 0.5s;
  }

  > .toggle-circle {
    position: absolute;
    top: 8px;
    left: 8px;
    width: 40px;
    height: 40px;
    border-radius: 25px;
    background-color: #ffffff;
    background-image: none;
    transition: 0.5s;
  }

  > .toggle--checked {
    left: 240px;
    transition: 0.5s;
  }

  > .user-text-wrapper {
    position: absolute;
    top: 18px;
    left: 155px;
    font-size: 18px;
  }

  > .text--blind {
    display: none;
  }

  > .zipsa-text-wrapper {
    position: absolute;
    top: 18px;
    left: 15px;
    font-size: 18px;
    color: #ffffff;
  }
`;

function Toggle({ isWorked, setIsWorked }) {
  // const { setUserState } = useUserInfo();

  const toggleHandler = () => {
    changeUserState().then(() => {
      setIsWorked(!isWorked);
      // setUserState(!isWorked ? 'USER' : 'ZIPSA');
    });
  };

  return (
    <ToggleWrapper onClick={toggleHandler}>
      <div
        className={`toggle-wrapper ${isWorked ? 'toggle--checked' : null}`}
      ></div>
      <div
        className={`toggle-circle ${isWorked ? 'toggle--checked' : null}`}
      ></div>
      <div className={`user-text-wrapper ${isWorked ? 'text--blind' : null}`}>
        집사로 전환하기
      </div>
      <div className={`zipsa-text-wrapper ${!isWorked ? 'text--blind' : null}`}>
        고객으로 전환하기
      </div>
    </ToggleWrapper>
  );
}

export default Toggle;
