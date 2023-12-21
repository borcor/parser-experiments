import { parseToken } from "./parse-token";

describe('Reverse Polish Notation:- parseToken', () => {
  it('should add a number to an empty stack', () => {
    const result = parseToken([], '4');
    expect(result).toEqual([4]);
  });

  it('should add a number to the stack with existing entires', () => {
    const result = parseToken([2], '3');
    expect(result).toEqual([2, 3]);
  });

  it('should throw an error if there are not enough arguments', () => {
    expect(() => parseToken([4], '+')).toThrowError('not enough arguments for + operator')
  });

  it('should throw an error if the token is unknown', () => {
    expect(() => parseToken([4, 9], 'foo')).toThrowError('unknown token: foo')
  });

  it('should perform an addition', () => {
    const result = parseToken([2, 3, 4], '+');
    expect(result).toEqual([2, 7]);
  });

  it('should perform a subtraction', () => {
    const result = parseToken([2, 3, 4], '-');
    expect(result).toEqual([2, -1]);
  });

  it('should perform a multiplication', () => {
    const result = parseToken([2, 3, 4], '*');
    expect(result).toEqual([2, 12]);
  });

  it('should perform a division', () => {
    const result = parseToken([2, 2, 4], '/');
    expect(result).toEqual([2, 0.5]);
  });

  it('should perform an exponentiation', () => {
    const result = parseToken([2, 3, 2], '^');
    expect(result).toEqual([2, 9]);
  });
});