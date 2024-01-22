import { useState } from 'react';
import { useFunnel } from '../../hooks/useFunnel';

import Name from './Name';
import Gender from './Gender';

function RegisterFunnel() {
  const [registerData, setRegisterData] = useState();
  const [Funnel, setStep] = useFunnel('GENDER');

  return (
    <Funnel>
      <Funnel.Step name="NAME">
        <Name
          onNext={() => {
            setStep('GENDER');
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
