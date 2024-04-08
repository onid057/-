import styled from 'styled-components';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useState } from 'react';
import Input from './Input';

const AddressInputWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
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
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
`;

const Button = styled.button`
  cursor: pointer;
  padding: 0 10px;
  background-color: #f5f5f5;
  font-size: 18px;
`;

function AddressInput({
  defaultAddress,
  defaultDetailAddress,
  setAddress,
  setDetailAddress,
}) {
  const [zoneCode, setZoneCode] = useState('');

  const open = useDaumPostcodePopup();

  const handleComplete = data => {
    let zoneCode = data.zonecode;
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setZoneCode(zoneCode);
    setAddress(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <AddressInputWrapper>
      <InputBox>
        <InputBoxFirst>
          <Input
            width={'128px'}
            placeholder="우편번호"
            value={zoneCode}
            disabled
          ></Input>
          <Button onClick={handleClick}>검색</Button>
        </InputBoxFirst>
        <Input
          width={'100%'}
          placeholder="주소"
          onChange={event => setAddress(event.target.value)}
          defaultValue={defaultAddress}
          disabled
        ></Input>
        <Input
          width={'100%'}
          placeholder="상세 주소"
          onChange={event => setDetailAddress(event.target.value)}
          defaultValue={defaultDetailAddress}
        ></Input>
      </InputBox>
    </AddressInputWrapper>
  );
}

export default AddressInput;
