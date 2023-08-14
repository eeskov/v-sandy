export interface ErrorLike {
  message: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isErrorLike(obj: any): obj is ErrorLike {
  return obj && obj.message && typeof obj.message === 'string';
}
