import { useState } from 'react';
import { useFunnel } from '../../hooks/useFunnel';

import Name from './Name';
import Gender from './Gender';

function RegisterFunnel() {
  const [registerData, setRegisterData] = useState({});
  const [Funnel, setStep] = useFunnel('NAME');

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
        ></Name>
      </Funnel.Step>

      <Funnel.Step name="GENDER">
        <Gender
          onNext={() => {
            setStep('NAME');
          }}
        ></Gender>
      </Funnel.Step>
    </Funnel>
  );
}

export default RegisterFunnel;
