import { useState } from 'react';
import { useFunnel } from '../../hooks/useFunnel';

import Name from './Name';
import Gender from './Gender';
import Email from './Email';

function RegisterFunnel() {
  const [registerData, setRegisterData] = useState({});
  const [Funnel, setStep] = useFunnel('NAME');

  console.log(registerData);

  return (
    <Funnel>
      <Funnel.Step name="NAME">
        <Name
          onPrevious={() => {
            setStep('GENDER');
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
            setStep('EMAIL');
            setRegisterData({ ...registerData, userGender: data });
          }}
          userGender={registerData.userGender}
        ></Gender>
      </Funnel.Step>

      <Funnel.Step name="EMAIL">
        <Email
          onPrevious={() => {
            setStep('GENDER');
          }}
          onNext={data => {
            setStep('NAME');
            setRegisterData({ ...registerData, userEmail: data });
          }}
          userEmail={registerData.userEmail}
        ></Email>
      </Funnel.Step>
    </Funnel>
  );
}

export default RegisterFunnel;
