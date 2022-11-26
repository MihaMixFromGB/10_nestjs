import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';

import { CommentsService } from './comments.service';
import { Comment } from './comment.interface';
import { CommentDto } from './comment.dto';

@Controller('api/news/:newsId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getAllComments(@Param('newsId') newsId: string): Promise<Comment[]> {
    return this.commentsService.getAllComments(newsId);
  }

  @Get(':commentId')
  async get(
    @Param('newsId') newsId: string,
    @Param('commentId') commentId: string,
  ): Promise<Comment> {
    return this.commentsService.get(newsId, commentId);
  }

  @Post()
  async create(@Body() commentDto: CommentDto): Promise<Comment> {
    return this.commentsService.create(commentDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() commentDto: CommentDto,
  ): Promise<boolean> {
    return this.commentsService.update(id, commentDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Body() commentDto: CommentDto,
  ): Promise<boolean> {
    return this.commentsService.remove(id, commentDto);
  }
}
