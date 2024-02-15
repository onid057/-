import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFunnel } from '../../hooks/useFunnel';
import { getLngLatFromAddress } from '../../apis/api/addressToLngLat';
import { createAccount } from '../../apis/api/register';

import Name from './Name';
import Gender from './Gender';
import Birth from './Birth';
import Email from './Email';
import PassWord from './PassWord';
import Address from './Address';

function RegisterFunnel() {
  const [registerData, setRegisterData] = useState({});
  const [Funnel, setStep] = useFunnel('NAME');
  const [location, setLocation] = useState();

  const navigate = useNavigate();

  console.log(registerData);

  useEffect(() => {
    const asyncFunction = async data => {
      const latlng = await getLngLatFromAddress(data);
      console.log(latlng);
      setLocation(latlng);
    };
    if (registerData.userAddress) asyncFunction(registerData.userAddress);
  }, [registerData.userAddress]);

  return (
    <Funnel>
      <Funnel.Step name="NAME">
        <Name
          onPrevious={() => {
            navigate('/login');
          }}
          onNext={data => {
            setStep('GENDER');
            setRegisterData({ ...registerData, userName: data });
          }}
          userName={registerData.userName}
        ></Name>
      </Funnel.Step>

      <Funnel.Step name="GENDER">
        <Gender
          onPrevious={() => {
            setStep('NAME');
          }}
          onNext={data => {
            setStep('BIRTH');
            setRegisterData({ ...registerData, userGender: data });
          }}
          userGender={registerData.userGender}
        ></Gender>
      </Funnel.Step>

      <Funnel.Step name="BIRTH">
        <Birth
          onPrevious={() => {
            setStep('GENDER');
          }}
          onNext={data => {
            setStep('ADDRESS');
            setRegisterData({ ...registerData, userBirth: data });
          }}
          userBirth={registerData.userBirth}
        ></Birth>
      </Funnel.Step>

      <Funnel.Step name="ADDRESS">
        <Address
          onPrevious={() => {
            setStep('BIRTH');
          }}
          onNext={(address, detailAddress) => {
            setStep('EMAIL');
            setRegisterData({
              ...registerData,
              userAddress: address,
              userDetailAddress: detailAddress,
            });
          }}
          userAddress={registerData.userAddress}
          userDetailAddress={registerData.userDetailAddress}
        ></Address>
      </Funnel.Step>

      <Funnel.Step name="EMAIL">
        <Email
          onPrevious={() => {
            setStep('ADDRESS');
          }}
          onNext={data => {
            setStep('PASSWORD');
            setRegisterData({
              ...registerData,
              userEmail: data,
            });
          }}
          userEmail={registerData.userEmail}
          isValidEmail={registerData.isValidEmail}
        ></Email>
      </Funnel.Step>

      <Funnel.Step name="PASSWORD">
        <PassWord
          onPrevious={() => {
            setStep('EMAIL');
          }}
          onNext={data => {
            const nextRegisterData = { ...registerData, userPassword: data };
            createAccount(
              nextRegisterData.userName,
              nextRegisterData.userGender,
              nextRegisterData.userBirth,
              nextRegisterData.userAddress +
                ' ' +
                nextRegisterData.userDetailAddress,
              location.Ma,
              location.La,
              nextRegisterData.userEmail,
              nextRegisterData.userPassword,
            );
            navigate('/registerSuccess');
          }}
        ></PassWord>
      </Funnel.Step>
    </Funnel>
  );
}

export default RegisterFunnel;
