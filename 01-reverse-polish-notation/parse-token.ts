export const parseToken = (stack: number[], token: string) => {
  if (!isNaN(parseFloat(token))) {
    stack.push(parseFloat(token));
    return stack;
  }

  if (stack.length < 2) {
    throw new Error(`not enough arguments for ${token} operator`)
  }

  const right = stack.pop()!;
  const left = stack.pop()!;

  if (token === '+') {
    stack.push(left + right);
    return stack;
  }

  if (token === '-') {
    stack.push(left - right);
    return stack;
  }

  if (token === '*') {
    stack.push(left * right);
    return stack;
  }

  if (token === '/') {
    stack.push(left / right);
    return stack;
  }

  if (token === '^') {
    stack.push(left ** right);
    return stack;
  }

  throw new Error(`unknown token: ${token}`);
}


