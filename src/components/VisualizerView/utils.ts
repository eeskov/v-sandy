const WHITE = '#fff';
const GREEN = '#83ff83';

export const getColor = (val1: unknown, val2: unknown): string => {
  return val1 === val2 ? WHITE : GREEN;
};

export function is2DArray(array: unknown): array is unknown[][] {
  return Array.isArray(array) && Array.isArray(array[0]);
}
