import {
  Controller,
  Put,
  Patch,
  Body,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiHeader, ApiResponse } from '@nestjs/swagger';

import { Calculator } from './calculator.interface';
import { OperatorsDto } from './calculator.dto';
import { CalculatorService } from './calculator.service';

@ApiTags('calculator')
@ApiHeader({
  name: 'Type-Operation',
  description: `Operation must be 'plus', 'minus', 'multiply' or 'divide'`,
})
@Controller('calculator')
export class CalculatorController {
  constructor(private calculator: CalculatorService) {}

  @Put()
  @ApiResponse({
    status: 200,
    description: 'The operation has been successfully completed.',
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal server error. The operation type maybe is not correct',
  })
  async calc(
    @Headers('Type-Operation') operation: Calculator['operation'],
    @Body() operatorsDto: OperatorsDto,
  ) {
    try {
      this.calculator.setOperator1(operatorsDto.operator1 || 0);
      this.calculator.setOperator2(operatorsDto.operator2 || 0);
      this.calculator.setOperation(operation);

      return this.calculator.calc();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch()
  @ApiResponse({
    status: 200,
    description: 'The operation has been successfully completed.',
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal server error. The operation type maybe is not correct',
  })
  async calcWithPreviousValue(
    @Headers('Type-Operation') operation: Calculator['operation'],
    @Body() operatorsDto: OperatorsDto,
  ) {
    try {
      if (operatorsDto.operator1 != null) {
        this.calculator.setOperator1(operatorsDto.operator1);
      }
      if (operatorsDto.operator2 != null) {
        this.calculator.setOperator2(operatorsDto.operator2);
      }
      this.calculator.setOperation(operation);

      return this.calculator.calc();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
