export const evaluateTrigFunction = (id: string, value: number): number => {
  if (id === 'sin') return Math.sin(value);
  if (id === 'cos') return Math.cos(value);
  if (id === 'tan') return Math.tan(value);

  throw new Error(`Unknown trigonometric function: ${id}`);
}
