import { VisualizerStep } from './VisualizerStep';

interface VisualizerViewProps {
  visualizerStates: { [key: string]: unknown[] };
}

export function VisualizerView({ visualizerStates }: VisualizerViewProps) {
  const keys = Object.keys(visualizerStates);
  return (
    <>
      {visualizerStates['start'] && <VisualizerStep name="Start" states={visualizerStates['start']} />}
      {keys
        .filter((k) => !['start', 'end'].includes(k))
        .map((key) => {
          return <VisualizerStep key={key} name={key} states={visualizerStates[key]} />;
        })}
      {visualizerStates['start'] && visualizerStates['end'] && (
        <VisualizerStep name="End" states={[...visualizerStates['start'], ...visualizerStates['end']]} onlyDiff />
      )}
    </>
  );
}
