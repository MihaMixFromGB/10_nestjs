import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';

import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: TreeRepository<Comment>,
  ) {}

  async findAllByNews(newsId: number): Promise<Comment[]> {
    const comments: Comment[] = [];

    const rootComments = (
      await this.commentsRepository.findRoots({ relations: ['user'] })
    )
      .filter((item) => item.newsId === newsId)
      .sort(this.compareComments);

    for (const comment of rootComments) {
      const res = await this.convertTreeToArray(comment);
      comments.push(...res);
    }

    return comments;
  }

  async findById(id: number): Promise<Comment> {
    return await this.commentsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }
  async create(newComment: Comment): Promise<Comment> {
    return this.commentsRepository.save(newComment);
  }

  async update(updatedComment: Comment): Promise<Comment> {
    return this.commentsRepository.save(updatedComment);
  }

  async remove(id: number): Promise<Comment> {
    const deletedComment = await this.findById(id);

    return this.commentsRepository.remove(deletedComment);
  }

  private async convertTreeToArray(
    parent: Comment,
    arr?: Comment[],
  ): Promise<Comment[]> {
    arr = arr || [];

    const _parent = { ...parent };
    delete _parent.children;
    arr.push(_parent);

    const commentsTree = await this.commentsRepository.findDescendantsTree(
      parent,
      {
        depth: 1,
        relations: ['user'],
      },
    );

    const children = commentsTree.children.sort(this.compareComments);

    for (const comment of children) {
      await this.convertTreeToArray(comment, arr);
    }

    return arr;
  }

  private compareComments(item1: Comment, item2: Comment) {
    return item1.createdAt.getTime() - item2.createdAt.getTime();
  }
}
