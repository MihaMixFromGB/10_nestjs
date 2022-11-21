import { IsString, IsOptional } from 'class-validator';

import { Comment } from './comment.interface';

export class CommentDto implements Omit<Comment, 'id' | 'children'> {
  @IsString()
  newsId: string;

  @IsOptional()
  @IsString()
  parentId: string | null;

  @IsString()
  author: string;

  @IsString()
  text: string;
}
