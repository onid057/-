import { styled } from 'styled-components';
import React, { useEffect, useRef } from 'react';
import input from './Input';

const AddressInputWrapper = styled.div`
  box-sizing: border-box;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const InsideWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 21px;
`;

const TitleBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-size: 20px;
  font-weight: light;
`;

const NoContentBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  font-weight: light;
  font-size: 20px;
`;

const ContentBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  padding: 0px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  font-weight: light;
  font-size: 16px;
  color: gray;
  background-color: #ffffff;
  border-radius: 25px;
`;

const ExampleText = styled.div`
  font-size: 18px;
  font-weight: light;
  opacity: 30%;
`;

function AddressInput() {
  const postcodeRef = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // 스크립트 로드 후에 실행할 코드
      // 여기서는 우편번호 서비스를 초기화하고 팝업을 열도록 설정
      postcodeRef.current = new window.daum.Postcode({
        oncomplete: function (data) {
          // 팝업에서 검색결과 항목을 클릭했을 때 실행할 코드
          console.log('우편번호 정보:', data);
        },
      });
      postcodeRef.current.open();
    };

    return () => {
      // 컴포넌트가 언마운트되면 스크립트를 제거
      document.body.removeChild(script);
    };
  }, []);

  return (
    <AddressInputWrapper>
      <InsideWrapper>
        <TitleBox>장소</TitleBox>
        <NoContentBox>
          {/* 우편번호 서비스를 트리거할 버튼 또는 다른 UI 요소를 추가 */}
          <button onClick={() => postcodeRef.current.open()}>
            우편번호 찾기
          </button>
        </NoContentBox>
      </InsideWrapper>

      <InsideWrapper>
        <TitleBox>세부 장소와 방법</TitleBox>
        <ContentBox></ContentBox>
      </InsideWrapper>
    </AddressInputWrapper>
  );
}

export default AddressInput;
