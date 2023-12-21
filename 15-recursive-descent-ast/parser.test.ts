import { Parser } from "./parser";

describe('Parser', () => {
  it('should parse a simple expression', () => {
    const parser = new Parser('1 + 2 * -3');
    const ast = parser.parse();
  });
});
