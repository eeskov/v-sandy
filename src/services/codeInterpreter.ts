import { isErrorLike } from '../utils';
import { v } from './visualizerAPI';

export class InputError extends Error {}
export class CodeError extends Error {}

export function runCode(code: string, input: string): unknown {
  try {
    const parsedInput = input.split('\n').map((s) => JSON.parse(s));
    try {
      const wrapper = new Function('v', `return ${code}`);
      const func = wrapper(v);
      return func.apply(func, parsedInput);
    } catch (e: unknown) {
      if (isErrorLike(e)) throw new CodeError(e.message);
    }
  } catch (e: unknown) {
    if (isErrorLike(e)) throw new InputError(e.message);
  }
}
