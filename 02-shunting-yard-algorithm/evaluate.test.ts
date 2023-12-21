import { evaluate } from "./evaluate"

describe('evaluate', () => {
  it('should evaluate a complex expression', () => {
    const result = evaluate('(3 + 4) * (8 + 7) * 8 ^ 2');

    expect(result).toEqual(6720);
  });
});
