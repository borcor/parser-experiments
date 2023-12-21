const whitespace = /^\s+/;
const operators = /^\+|\-|\*|\/|\^/;

export const makeTokenizer = (input: string) => {
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
        const length = parseFloat(remaining).toString().length;
        const result = remaining.slice(0, length);
        cursor += length;
        remaining = remaining.slice(length);
        return result;
      }

      if (match = remaining.match(operators)) {
        cursor += 1;
        remaining = remaining.slice(1);
        return match[0];
      }

      throw new Error(`Unknown token: ${remaining[0]}`)
    }
  }
}