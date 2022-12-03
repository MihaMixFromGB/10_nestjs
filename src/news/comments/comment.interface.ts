import { User } from 'src/users/user.entity';
import { Comment } from './comment.entity';

export interface IComment {
  id: number;
  parentId?: number;
  parent?: Comment;
  children: Comment[];
  message: string;
  newsId: number;
  userId: number;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
