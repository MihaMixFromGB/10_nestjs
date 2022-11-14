import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { Calculator } from './calculator.interface';

export class OperatorsDto implements Omit<Calculator, 'operation'> {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ default: 10 })
  operator1: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ default: 2 })
  operator2: number;
}
