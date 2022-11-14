import { Injectable } from '@nestjs/common';

import { Calculator } from './calculator.interface';

@Injectable()
export class CalculatorService {
  private calculator: Calculator = {
    operator1: 0,
    operator2: 0,
    operation: 'plus',
  };

  setOperator1(value: number) {
    this.calculator.operator1 = value;
  }
  setOperator2(value: number) {
    this.calculator.operator2 = value;
  }
  setOperation(value: Calculator['operation']) {
    this.calculator.operation = value;
  }

  calc(): number {
    switch (this.calculator.operation) {
      case 'plus': {
        return this.calculator.operator1 + this.calculator.operator2;
        break;
      }
      case 'minus': {
        return this.calculator.operator1 - this.calculator.operator2;
        break;
      }
      case 'multiply': {
        return this.calculator.operator1 * this.calculator.operator2;
        break;
      }
      case 'divide': {
        return this.calculator.operator1 / this.calculator.operator2;
        break;
      }
      default: {
        throw new Error(
          `Operator must be 'plus', 'minus', 'multiply' or 'divide'`,
        );
      }
    }
  }
}
