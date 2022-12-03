import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryDto } from './category.dto';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  async findById(id: number): Promise<Category> {
    return await this.categoriesRepository.findOneBy({ id });
  }

  async create(categoryDto: CategoryDto): Promise<Category> {
    let newCategory = new Category();
    newCategory = {
      ...newCategory,
      ...categoryDto,
    };

    return await this.categoriesRepository.save(newCategory);
  }

  async update(id: number, categoryDto: CategoryDto): Promise<Category> {
    let updatedCategory = new Category();
    updatedCategory = {
      ...updatedCategory,
      ...categoryDto,
      id,
    };

    return await this.categoriesRepository.save(updatedCategory);
  }

  async remove(id: number): Promise<Category> {
    const deletedCategory = await this.findById(id);

    return await this.categoriesRepository.remove(deletedCategory);
  }
}
