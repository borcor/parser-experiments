import { evaluateRPN } from "./evaluate-rpn"

describe('Reverse Polish Notation:- evaluator', () => {
  it('should correctly evaluate an expression', () => {
    const result = evaluateRPN('1 2 3 * + -4.5 -');
    expect(result).toEqual(11.5);
  });
});