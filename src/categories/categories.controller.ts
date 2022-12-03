import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { CategoryDto } from './category.dto';
import { Category } from './category.entity';

@Controller('api/categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<Category> {
    return this.categoriesService.findById(id);
  }

  @Post()
  create(@Body() categoryDto: CategoryDto): Promise<Category> {
    return this.categoriesService.create(categoryDto);
  }

  @Patch(':id')
  update(
    @Param() id: number,
    @Body() categoryDto: CategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update(id, categoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<Category> {
    return this.categoriesService.remove(id);
  }
}
