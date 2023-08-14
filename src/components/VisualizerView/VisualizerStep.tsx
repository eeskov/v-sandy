import { Slider, Typography } from 'antd';
import { useState } from 'react';

import { Collapsible } from '../Collapsible';
import { render2DArray, renderArray } from './renders';
import styles from './VisualizerView.module.css';
import { is2DArray } from './utils';

const { Title } = Typography;

interface VisualizerStepProps {
  name: string;
  states: unknown[];
  onlyDiff?: boolean;
}
export function VisualizerStep({ name, states, onlyDiff }: VisualizerStepProps) {
  const [step, setStep] = useState<number>(onlyDiff ? 2 : 1);
  let visualizerData: JSX.Element | JSX.Element[] | null = null;

  const prevStep = states[step - 2] || states[step - 1];
  const currentStep = states[step - 1];

  if (Array.isArray(states[0]) && is2DArray(currentStep)) {
    visualizerData = render2DArray(currentStep, prevStep as unknown[][]);
  } else if (Array.isArray(states[0])) {
    visualizerData = renderArray(currentStep as unknown[], prevStep as unknown[]);
  } else if (typeof currentStep === 'object') {
    visualizerData = render2DArray(
      [Object.keys(currentStep as unknown[]), Object.values(currentStep as unknown[])],
      [Object.keys(prevStep as unknown[]), Object.values(prevStep as unknown[])]
    );
  } else if (currentStep && prevStep) {
    visualizerData = renderArray(currentStep.toString().split(''), prevStep.toString().split(''));
  }

  if (onlyDiff) {
    return (
      <Collapsible title={name}>
        <div style={{ marginBottom: '20px' }}>{visualizerData}</div>
      </Collapsible>
    );
  }
  return (
    <Collapsible title={name}>
      <div className={styles.block}>
        {visualizerData}
        {states.length > 1 && (
          <div style={{ minWidth: '400px' }}>
            <Title level={5}>Step: {step}</Title>
            <Slider min={1} max={states.length} onChange={setStep} value={step} />
          </div>
        )}
      </div>
    </Collapsible>
  );
}
