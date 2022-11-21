import { nanoid } from 'nanoid';

import { Comment } from './comment.interface';
import { CommentDto } from './comment.dto';

export class CommentsStore {
  private readonly store: Record<string, Record<string, Comment>> = {};

  //  TODO: Return new objects, no refs. Maybe... lazy loading by levels
  public getAll(newsId: string): Comment[] {
    if (!this.store[newsId]) {
      return [];
    }
    const comments: Comment[] = Object.values(this.store[newsId]);

    return comments;
  }

  private getByRef(
    newsId: string,
    commentId: string,
    storeSlice: Record<string, Comment> | null,
  ): Comment | null {
    storeSlice = storeSlice ?? this.store[newsId];

    if (!storeSlice) {
      return null;
    }

    let comment = storeSlice[commentId];
    if (comment) {
      return comment;
    }

    for (const parent of Object.values(storeSlice)) {
      comment = this.getByRef(newsId, commentId, parent.children);
      if (comment) {
        return comment;
      }
    }

    return null;
  }

  public get(newsId: string, commentId: string): Comment | null {
    const existComment = this.getByRef(newsId, commentId, null);
    if (!existComment) {
      return null;
    }

    return { ...existComment };
  }

  public add(commentDto: CommentDto): Comment | null {
    const newComment: Comment = {
      ...commentDto,
      id: nanoid(),
      children: {},
    };

    if (!this.store[commentDto.newsId]) {
      this.store[commentDto.newsId] = {};
    }

    if (newComment.parentId == null) {
      newComment.parentId = null;

      const newsComments = this.store[commentDto.newsId];
      newsComments[newComment.id] = newComment;
      return { ...newComment };
    }

    const parent = this.get(commentDto.newsId, newComment.parentId);
    if (!parent) {
      return null;
    }

    parent.children[newComment.id] = newComment;

    return { ...newComment };
  }

  public update(commentId: string, commentDto: CommentDto): boolean {
    const existComment = this.getByRef(commentDto.newsId, commentId, null);
    if (!existComment) {
      return false;
    }
    existComment.text = commentDto.text;
    return true;
  }

  public remove(commentId: string, commentDto: CommentDto): boolean {
    const { newsId, parentId } = commentDto;
    if (parentId == null) {
      const newsComments = this.store[newsId];
      if (!newsComments || !newsComments[commentId]) {
        return false;
      }

      delete newsComments[commentId];
      return true;
    }

    const parent = this.get(newsId, parentId);
    if (!parent) {
      return false;
    }
    delete parent.children[commentId];
    return true;
  }

  public setDefaultValues(): void {
    this.store['1'] = {
      '1': {
        id: '1',
        newsId: '1',
        parentId: null,
        children: {
          '11': {
            id: '11',
            newsId: '1',
            parentId: '1',
            children: {},
            author: 'ironman',
            text: 'Hello!',
          },
        },
        author: 'batman',
        text: 'Great!',
      },
      '2': {
        id: '2',
        newsId: '1',
        parentId: null,
        children: {
          '21': {
            id: '21',
            newsId: '1',
            parentId: '2',
            children: {
              '211': {
                id: '211',
                newsId: '1',
                parentId: '21',
                children: {},
                author: 'ironman',
                text: 'Wow, ironman on Level 3!',
              },
            },
            author: 'batman',
            text: 'Hey, from batman!',
          },
        },
        author: 'superman',
        text: 'Fine!',
      },
    };
  }
}
