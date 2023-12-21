import { makeTokenizer } from "./tokenizer"

describe('Shunting Yard:- tokenizer', () => {
  it('should tokenize a valid input', () => {
    const tokenizer = makeTokenizer('1 + 2 * 3 / (4 - 5)');
    expect(tokenizer.next()).toEqual({
      token: 'number',
      value: 1,
      raw: '1'
    });
    expect(tokenizer.next()).toEqual({
      token: 'operator',
      symbol: '+'
    });
    expect(tokenizer.next()).toEqual({
      token: 'number',
      value: 2,
      raw: '2'
    });
    expect(tokenizer.next()).toEqual({
      token: 'operator',
      symbol: '*'
    });
    expect(tokenizer.next()).toEqual({
      token: 'number',
      value: 3,
      raw: '3'
    });
    expect(tokenizer.next()).toEqual({
      token: 'operator',
      symbol: '/'
    });
    expect(tokenizer.next()).toEqual({
      token: 'left-paren',
    });
    expect(tokenizer.next()).toEqual({
      token: 'number',
      value: 4,
      raw: '4'
    });
    expect(tokenizer.next()).toEqual({
      token: 'operator',
      symbol: '-'
    });
    expect(tokenizer.next()).toEqual({
      token: 'number',
      value: 5,
      raw: '5'
    });
    expect(tokenizer.next()).toEqual({
      token: 'right-paren',
    });
    expect(tokenizer.next()).toBeUndefined();
  });
});
