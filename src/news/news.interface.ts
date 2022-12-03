import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';

export interface INews {
  id: number;
  title: string;
  description: string;
  authorId: number;
  author: User;
  cover?: string;
  categoryId: number;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
}
