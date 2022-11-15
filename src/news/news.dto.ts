import { IsNotEmpty, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { News } from './news.interface';

export class CreateNewsDto implements Omit<News, 'id'> {
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

  @IsDateString()
  @ApiProperty({ default: '2022' })
  createdAt: string;
}

export class NewsDto extends CreateNewsDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}

export class DeleteNewsDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}
