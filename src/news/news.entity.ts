import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { INews } from './news.interface';
import { Category } from '../categories/category.entity';
import { User } from '../users/user.entity';
import { Comment } from './comments/comment.entity';

@Entity('news')
export class News implements Omit<INews, 'authorId' | 'categoryId'> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  cover: string;

  @ManyToOne(() => Category, (category) => category.news)
  category: Category;

  @ManyToOne(() => User, (user) => user.news)
  author: User;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
