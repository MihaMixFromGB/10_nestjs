import { Comment } from '../comment.interface';

export interface CommentView extends Comment {
  level: number;
}
