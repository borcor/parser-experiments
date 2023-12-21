export interface Operator {
  symbol: string;
  precedence: number;
  associativity: 'left' | 'right';
}
