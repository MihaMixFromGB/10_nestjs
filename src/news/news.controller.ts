import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { News } from './news.interface';
import { CreateNewsDto, DeleteNewsDto, NewsDto } from './news.dto';
import { NewsService } from './news.service';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The news have been successfully found.',
  })
  async getNews(): Promise<News[]> {
    return this.newsService.get();
  }
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The news has been successfully found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. ID maybe is not correct.',
  })
  async getNewsById(@Param('id') id: string): Promise<News | null> {
    try {
      return this.newsService.getById(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The news has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Data validation has been failed.',
  })
  async createNews(@Body() createNewsDto: CreateNewsDto): Promise<News> {
    return this.newsService.create(createNewsDto);
  }
  @Put()
  @ApiResponse({
    status: 200,
    description: 'The news has been successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Data validation has been failed.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. ID maybe is not correct.',
  })
  async updateNews(@Body() news: NewsDto): Promise<void> {
    try {
      this.newsService.update(news);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Delete()
  @ApiResponse({
    status: 200,
    description: 'The news has been successfully removed.',
  })
  async removeNews(@Body() deleteNewsDto: DeleteNewsDto): Promise<void> {
    this.newsService.remove(deleteNewsDto.id);
  }
}
