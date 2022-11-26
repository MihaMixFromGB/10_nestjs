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
import { NewsDto } from './news.dto';
import { NewsService } from './news.service';

@ApiTags('news')
@Controller('api/news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The news have been successfully found.',
  })
  async getAllNews(): Promise<News[]> {
    return this.newsService.getAllNews();
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
  async getNews(@Param('id') id: string): Promise<News | null> {
    try {
      return this.newsService.get(id);
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
  async createNews(@Body() newsDto: NewsDto): Promise<News> {
    return this.newsService.create(newsDto);
  }
  @Put(':id')
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
  async updateNews(
    @Param('id') id: string,
    @Body() newsDto: NewsDto,
  ): Promise<void> {
    try {
      const updatedNews: News = {
        ...newsDto,
        id,
      };
      this.newsService.update(updatedNews);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The news has been successfully removed.',
  })
  async removeNews(@Param('id') id: string): Promise<void> {
    this.newsService.remove(id);
  }
}
