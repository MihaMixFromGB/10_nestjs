import { Injectable } from '@nestjs/common';

import { CommentsStore } from './comments.store';
import { Comment } from './comment.interface';
import { CommentDto } from './comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly store: CommentsStore) {
    this.store.setDefaultValues();
  }

  public getAllComments(newsId: string): Comment[] {
    return this.store.getAll(newsId);
  }

  public get(newsId: string, id: string): Comment {
    return this.store.get(newsId, id);
  }

  public create(commentDto: CommentDto): Comment {
    return this.store.add(commentDto);
  }

  public update(id: string, commentDto: CommentDto): boolean {
    return this.store.update(id, commentDto);
  }

  public remove(id: string, commentDto: CommentDto): boolean {
    return this.store.remove(id, commentDto);
  }
}
