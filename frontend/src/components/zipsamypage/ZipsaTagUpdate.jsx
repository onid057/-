import styled from 'styled-components';
import { useState, useReducer } from 'react';
import Image from '../common/Image';

const Title = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-size: 18px;
  font-weight: light;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 52px;
  border: none;
  border-radius: 25px;
  background-color: white;
  color: #000000;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const InnerInput = styled.input`
  width: 170px;
  height: 70%;
  text-align: center;
  font-size: 18px;
  font-weight: 300;
  &:focus {
    outline: none;
    border-bottom: solid 1px #cccccc;
  }
  &::placeholder {
    color: #c0c0c0;
  }
`;

const InnerText = styled.div``;

const PencilImg = styled.div`
  cursor: pointer;
  position: absolute;
  right: 12px;
`;

function ZipsaTagUpdate({ preferTags, setPreferTags }) {
  // preferTag를 리스트로 까기
  const numberOfTags = preferTags.length;

  // preferTags 길이의 빈 배열 만들기 (useState의 초기값으로 사용)
  const checkMode = Array.from({ length: numberOfTags }, () => false);

  // input mode인지 아닌지를 판단할 변수
  const [checkInputMode, setIsInputMode] = useState(checkMode);

  // isInputMode 변수의 값을 변경(토글)하는 함수
  const changeMode = idx => {
    setIsInputMode(array =>
      [...array].map((element, index) => index === idx && !element),
    );
  };

  // 입력한 값 추적 위한 reducer 함수 정의
  const tagReducer = (state, action) => ({
    ...state, // 기존의 state 객체를 복사하는 부분
    [action.tag]: action.text,
  });

  const [tagState, dispatch] = useReducer(tagReducer, {});

  // 이벤트와 태그 값을 인자로 받아 해당 태그의 상태를 업데이트
  const changeTextValue = (e, tag) => {
    dispatch({ tag, text: e.target.value });
  };

  return (
    <>
      <Title>이런 일을 잘해요!</Title>

      {preferTags.map((tag, idx) => (
        <ButtonWrapper key={idx}>
          {checkInputMode[idx] ? (
            <InnerInput
              type="text"
              // value={textValues}
              placeholder={tag}
              onBlur={e => {
                changeMode(idx);
                const newArray = [...preferTags];
                newArray[idx] = e.target.value;
                setPreferTags(newArray);
              }} // 입력 모드에서 포커스가 빠져나가면 텍스트 모드로 전환
              onChangeCapture={e => changeTextValue(e, tag, idx)} // 입력모드에서 변화가 있고 포커스 아웃되었을 때
              autoFocus // 입력 모드 진입 시 자동으로 포커스를 설정
            />
          ) : (
            <InnerText>{tagState[tag] || tag}</InnerText>
          )}

          <PencilImg onClick={() => changeMode(idx)}>
            <Image
              src={`${process.env.PUBLIC_URL}/images/edit.svg`}
              width={'24px'}
              height={'24px'}
              margin={'0 0 0 -12px'}
            ></Image>
          </PencilImg>
        </ButtonWrapper>
      ))}
    </>
  );
}

export default ZipsaTagUpdate;
