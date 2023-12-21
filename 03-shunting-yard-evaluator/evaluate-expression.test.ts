import { evaluateExpression } from "./evaluate-expression"

describe('evaluateExpression', () => {
  it('should evaluate a complex expression', () => {
    const result = evaluateExpression('(3 + 4) * (8 + 7) * 8 ^ 2');

    expect(result).toEqual(6720);
  });
});
