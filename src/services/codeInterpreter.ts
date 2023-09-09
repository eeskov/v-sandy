import { isErrorLike } from '../utils';
import { v } from './visualizerAPI';

export class InputError extends Error {}
export class CodeError extends Error {}

export function runCode(code: string, input: string): unknown {
  const parseInput = (s: string) => JSON.parse(s);

  try {
    const parsedInput = input.split('\n').map(parseInput);
    const wrapper = new Function('v', `return ${code}`);
    const func = wrapper(v);
    return func.apply(func, parsedInput);
  } catch (error) {
    if (isErrorLike(error)) {
      if (error instanceof CodeError) {
        throw error;
      } else {
        throw new InputError(error.message);
      }
    }
  }
}
