import { IsNotEmpty, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { News } from './news.interface';

export class NewsDto implements Omit<News, 'id'> {
  @IsNotEmpty()
  @ApiProperty({ default: 'new author' })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ default: 'new description' })
  description: string;

  @IsOptional()
  @ApiProperty()
  @ApiPropertyOptional({ default: 'new author' })
  author?: string;

  @IsOptional()
  @ApiProperty()
  @ApiPropertyOptional({ default: 'qJnUSuBesExYtg1762efZ.jpg' })
  cover?: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ default: '2022' })
  createdAt: string;
}
