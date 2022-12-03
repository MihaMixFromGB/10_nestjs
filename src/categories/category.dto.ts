import { IsString, IsNotEmpty } from 'class-validator';
import { ICategory } from './category.interface';

export class CategoryDto implements Omit<ICategory, 'id'> {
  @IsString()
  @IsNotEmpty()
  name: string;
}
