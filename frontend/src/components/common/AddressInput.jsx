import { styled } from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import Input from './Input';
import Button from './Button';

const AddressInputWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
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

const InputBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  font-weight: light;
  font-size: 20px;
`;

const InputBoxFirst = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const AddressInput = () => {
  useEffect(() => {
    // useEffect 내에서 다음 지도 API 스크립트를 동적으로 로드
    const script = document.createElement('script');
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);

    // 컴포넌트가 언마운트될 때 스크립트 제거
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleOpenPopup = () => {
    // 다음 지도 API 코드 호출
    new window.daum.Postcode({
      oncomplete: function (data) {
        // 우편번호와 주소 데이터 출력
        const postCode = data.zonecode;
        const address = data.address + ' (' + data.buildingName + ')';
        // console.log('검색 결과:', data);
        console.log('우편번호:', postCode);
        console.log('주소:', address);
      },
    }).open();
  };

  return (
    <AddressInputWrapper>
      <InsideWrapper>
        <TitleBox>장소</TitleBox>
        <InputBox>
          <InputBoxFirst>
            <Input width={'128px'} placeholder="우편번호"></Input>
            {/* 우편번호 서비스를 트리거할 버튼 또는 다른 UI 요소를 추가 */}
            <Button
              onClick={handleOpenPopup}
              mode={'SMALL_WHITE'}
              msg={'우편번호 찾기'}
            ></Button>
          </InputBoxFirst>
          <Input width={'100%'} placeholder="주소"></Input>
          {/* 상세 주소는 input에서 받음 */}
          <Input width={'100%'} placeholder="상세 주소"></Input>
        </InputBox>
      </InsideWrapper>
    </AddressInputWrapper>
  );
};

export default AddressInput;
