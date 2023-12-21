const whitespace = /^\s+/;
const operators = /^\+|\-|\*|\/|\^/;

export interface Tokenizer {
  next: () => Token | undefined;
}

export type Token = NumberToken | LeftParenToken | RightParenToken | OperatorToken;

export interface NumberToken {
  token: 'number';
  value: number;
  raw: string;
}

export interface OperatorToken {
  token: 'operator';
  symbol: string;
}

export interface LeftParenToken {
  token: 'left-paren';
}

export interface RightParenToken {
  token: 'right-paren';
}

export const makeTokenizer = (input: string): Tokenizer => {
  let cursor = 0;
  let remaining = input;

  return {
    next: () => {
      let match;
      if (match = remaining.match(whitespace)) {
        cursor += match[0].length;
        remaining = remaining.slice(match[0].length);
      }

      if (!remaining.length) {
        return undefined;
      }

      if (!isNaN(parseFloat(remaining))) {
        const value = parseFloat(remaining);
        const length = value.toString().length;
        const result = remaining.slice(0, length);
        cursor += length;
        remaining = remaining.slice(length);
        return {
          token: 'number',
          value,
          raw: result
        };
      }

      if (remaining[0] === '(') {
        cursor += 1;
        remaining = remaining.slice(1);
        return {
          token: 'left-paren',
        };
      }

      if (remaining[0] === ')') {
        cursor += 1;
        remaining = remaining.slice(1);
        return {
          token: 'right-paren',
        };
      }

      if (match = remaining.match(operators)) {
        cursor += 1;
        remaining = remaining.slice(1);
        return {
          token: 'operator',
          symbol: match[0]
        };
      }

      throw new Error(`Unknown token: ${remaining[0]}`);
    }
  }
}