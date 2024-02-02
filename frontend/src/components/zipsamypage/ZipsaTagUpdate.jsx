import styled from 'styled-components';
import { useState } from 'react';
import Image from '../common/Image';

const Title = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-size: 20px;
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

function ZipsaTagUpdate({ preferTag }) {
  // preferTag를 리스트로 까기
  const preferTags = (preferTag || '').split('#');

  const [isInputMode, setIsInputMode] = useState(false);
  const [textValue, setTextValue] = useState(false);

  // isInputMode 변수의 값을 토글하는 함수
  const toggleMode = () => {
    setIsInputMode(prevMode => !prevMode);
    console.log('모드 바뀜', isInputMode);
  };

  // 이건 뭐냐;;
  const handleInputChange = e => {
    setTextValue(e.target.value);
  };

  return (
    <>
      <Title>이런 일을 잘해요!</Title>

      {preferTags.map((tag, idx) => (
        <ButtonWrapper key={idx}>
          {/* <InsideInput
          type="text"
          placeholder="자차보유"
          maxLength={10}
        ></InsideInput> */}

          {isInputMode ? (
            <InnerInput
              type="text"
              // value={textValue}
              placeholder={tag}
              onChange={handleInputChange}
              onBlur={toggleMode} // 입력 모드에서 포커스가 빠져나가면 텍스트 모드로 전환
              autoFocus // 입력 모드 진입 시 자동으로 포커스를 설정
            />
          ) : (
            <InnerText>{textValue || '태그를 입력해 주세요'}</InnerText>
          )}

          <PencilImg onClick={toggleMode}>
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
