import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { ICategory } from './category.interface';
import { News } from '../news/news.entity';

@Entity('categories')
export class Category implements ICategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => News, (news) => news.category)
  news: News[];
}
