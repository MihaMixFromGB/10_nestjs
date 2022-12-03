import {
  Entity,
  Tree,
  TreeParent,
  TreeChildren,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { IComment } from './comment.interface';
import { User } from '../../users/user.entity';

@Entity('comments')
@Tree('materialized-path')
export class Comment implements Omit<IComment, 'parentId' | 'userId'> {
  @PrimaryGeneratedColumn()
  id: number;

  @TreeParent()
  parent: Comment;

  @TreeChildren()
  children: Comment[];

  @Column()
  message: string;

  @Column()
  newsId: number;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
