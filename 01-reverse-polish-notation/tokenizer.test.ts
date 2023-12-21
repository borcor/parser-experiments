import { makeTokenizer } from "./tokenizer"

describe('Reverse Polish Notation:- tokenizer', () => {
  it('should tokenize a valid input', () => {
    const tokenizer = makeTokenizer('1.4 -2 + 30 67 80 * / - 2 2 ^ +');
    expect(tokenizer.next()).toEqual('1.4');
    expect(tokenizer.next()).toEqual('-2');
    expect(tokenizer.next()).toEqual('+');
    expect(tokenizer.next()).toEqual('30');
    expect(tokenizer.next()).toEqual('67');
    expect(tokenizer.next()).toEqual('80');
    expect(tokenizer.next()).toEqual('*');
    expect(tokenizer.next()).toEqual('/');
    expect(tokenizer.next()).toEqual('-');
    expect(tokenizer.next()).toEqual('2');
    expect(tokenizer.next()).toEqual('2');
    expect(tokenizer.next()).toEqual('^');
    expect(tokenizer.next()).toEqual('+');
    expect(tokenizer.next()).toBeUndefined();
  });
});
