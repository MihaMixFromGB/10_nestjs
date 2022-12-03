import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { INews } from './news.interface';

export class NewsDto
  implements
    Omit<INews, 'id' | 'author' | 'category' | 'createdAt' | 'updatedAt'>
{
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'new author' })
  title: string;

  @IsString()
  @ApiProperty({ default: 'new description' })
  description: string;

  @IsNumber()
  @ApiPropertyOptional({ default: 1 })
  authorId: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ default: 'qJnUSuBesExYtg1762efZ.jpg' })
  cover: string;

  @IsNumber()
  @ApiProperty({ default: 1 })
  categoryId: number;
}
