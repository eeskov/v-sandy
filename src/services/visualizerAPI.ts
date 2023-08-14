export type State = unknown[];
export interface StateContainer {
  [key: string]: State;
}

let stateConteiner: StateContainer = {};

function v(name = 'default', state: unknown, stat = false): void {
  if (!stateConteiner[name]) {
    stateConteiner[name] = [];
  }

  if (stat) {
    stateConteiner[`${name}-stat`].push(structuredClone(state));
    return;
  }

  stateConteiner[name].push(structuredClone(state));
}

function getStateContainer(): StateContainer | null {
  if (Object.keys(stateConteiner).length === 0) {
    return null;
  }
  return stateConteiner;
}

function clearStateContainer(): void {
  stateConteiner = {};
}

export { getStateContainer, clearStateContainer, v };
