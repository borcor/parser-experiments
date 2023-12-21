import { handleToken, toReversePolish } from "./to-reverse-polish"
import { NumberToken } from "./tokenizer"

const makeNumberToken = (number: number): NumberToken => ({
  token: 'number',
  value: number,
  raw: number.toString()
});

describe('handleToken', () => {
  it('should add a number to the output string', () => {
    const [stack, output] = handleToken([], '', makeNumberToken(40.5));
    expect(output).toEqual('40.5')
  });
});

describe('toReversePolish', () => {
  it('should handle a simple sum', () => {
    const result = toReversePolish('1 + 2');
    expect(result).toEqual('1 2 +');
  });
  it('should handle a longer sum', () => {
    const result = toReversePolish('1 + 2 - 3.3 + 9');
    expect(result).toEqual('1 2 + 3.3 - 9 +');
  });
  it('should handle a combination of terms', () => {
    const result = toReversePolish('3 * 8 - 9 * 7 ^ 2');
    expect(result).toEqual('3 8 * 9 7 2 ^ * -');
  });
  it('should handle parentheses', () => {
    const result = toReversePolish('(3 + 4) * (8 + 7) / 8 ^ 2');
    expect(result).toEqual('3 4 + 8 7 + * 8 2 ^ /');
  });
});
