import { Injectable } from '@nestjs/common';

import { Comment } from '../comment.interface';
import { CommentsService } from '../comments.service';
import { CommentView } from './comment.view.interface';

@Injectable()
export class CommentsViewService {
  constructor(private readonly commentsService: CommentsService) {}

  getAllComments(newsId: string): CommentView[] {
    const commentViews: CommentView[] = [];
    const comments: Comment[] = this.commentsService.getAllComments(newsId);

    for (const comment of comments) {
      commentViews.push({
        ...comment,
        level: 1,
      });
      this.setChildren(commentViews, 2, comment.children);
    }

    return commentViews;
  }

  private setChildren(
    commentViews: CommentView[],
    level: number,
    children: Record<string, Comment>,
  ): void {
    for (const comment of Object.values(children)) {
      commentViews.push({
        ...comment,
        level,
      });
      if (Object.values(comment.children).length) {
        this.setChildren(commentViews, level + 1, comment.children);
      }
    }
  }
}
