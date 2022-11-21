import { Controller, Get, Render, Param } from '@nestjs/common';

import { NewsService } from '../news.service';
import { CommentsViewService } from '../comments/comments.view/comments.view.service';

@Controller('news')
export class NewsVmController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentsViewService: CommentsViewService,
  ) {}

  @Get()
  @Render('news')
  async getAllNews() {
    return { news: this.newsService.getAllNews() };
  }

  @Get(':id/details')
  @Render('news-details')
  async getNews(@Param('id') id: string) {
    return {
      news: this.newsService.get(id),
      comments: this.commentsViewService.getAllComments(id),
    };
  }
}
