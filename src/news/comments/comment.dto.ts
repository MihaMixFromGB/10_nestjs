import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { IComment } from './comment.interface';

export class CommentDto
  implements
    Omit<
      IComment,
      'id' | 'parent' | 'children' | 'user' | 'createdAt' | 'updatedAt'
    >
{
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNumber()
  @IsOptional()
  parentId: number;

  @IsNumber()
  newsId: number;

  @IsNumber()
  userId: number;
}
