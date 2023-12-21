import { Operator } from "./types";

export const operators: Operator[] = [{
  symbol: '^',
  precedence: 4,
  associativity: 'right'
}, {
  symbol: '*',
  precedence: 3,
  associativity: 'left'
}, {
  symbol: '/',
  precedence: 3,
  associativity: 'left'
}, {
  symbol: '+',
  precedence: 2,
  associativity: 'left'
}, {
  symbol: '-',
  precedence: 2,
  associativity: 'left'
}];
