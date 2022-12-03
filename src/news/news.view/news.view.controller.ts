import { Controller, Get, Render, Param } from '@nestjs/common';

import { NewsService } from '../news.service';
import { CommentsService } from '../comments/comments.service';

@Controller('news')
export class NewsVmController {
  constructor(
    private newsService: NewsService,
    private commentsService: CommentsService,
  ) {}

  @Get()
  @Render('news')
  async getAllNews() {
    return { news: await this.newsService.findAll() };
  }

  @Get(':id')
  @Render('news-details')
  async getNews(@Param('id') id: number) {
    return {
      news: await this.newsService.findById(id),
      comments: await this.commentsService.findAllByNews(id),
    };
  }
}
