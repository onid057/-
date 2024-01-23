import { useState } from 'react';

export function useFunnel(initialStep) {
  const [step, setStep] = useState(initialStep); // 초기 선언 시 REGISTER_NAME 단계

  const Step = props => {
    return <>{props.children}</>;
  };

  const Funnel = ({ children }) => {
    const targetStep = children.find(
      childStep => childStep.props.name === step,
    );
    return { ...targetStep };
  };

  Funnel.Step = Step;

  return [Funnel, setStep];
}
