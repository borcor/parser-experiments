import { Parser } from "./parser"

describe('Parser', () => {
  it('should parse a single number', () => {
    const parser = new Parser('4.56');
    expect(parser.parse()).toEqual(4.56);
  });

  it('should parse an additive expression', () => {
    const parser = new Parser('4 + 8 - 5');
    expect(parser.parse()).toEqual(7);
  });

  it('should parse an additive expression with multiplicative terms', () => {
    const parser = new Parser('4 * 2 + 8 / 4 - 5 * 3');
    expect(parser.parse()).toEqual(-5);
  });

  it('should parse an expression with exponentiation', () => {
    const parser = new Parser('2 ^ 3 ^ 2 + 8');
    expect(parser.parse()).toEqual(520);
  });

  it('should parse an expression with exponentiation and division', () => {
    const parser = new Parser('1 + 2 ^ 2 * 3 - 4 / 2');
    expect(parser.parse()).toEqual(11);
  });

  it('should parse expressions with parentheses (1)', () => {
    const parser = new Parser('(1 + 2) * (6-3)');
    expect(parser.parse()).toEqual(9);
  });

  it('should parse expressions with parentheses (2)', () => {
    const parser = new Parser('(2 ^ 2) ^ 3');
    expect(parser.parse()).toEqual(64);
  });

  it('should handle expressions with negation (1)', () => {
    const parser = new Parser('-2 ^ 2 + 1');
    expect(parser.parse()).toEqual(-3);
  });

  it('should handle expressions with negation (2)', () => {
    const parser = new Parser('-(2 * 3)');
    expect(parser.parse()).toEqual(-6);
  });

  it('should handle expressions with trig. functions (1)', () => {
    const parser = new Parser('tan(0) + cos(0)');
    expect(parser.parse()).toEqual(1);
  });

  it('should handle expressions with trig. functions (2)', () => {
    const parser = new Parser('-cos(0) + 3 ^ 2');
    expect(parser.parse()).toEqual(8);
  });
});
