import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { CommentsService } from './comments.service';
import { UsersService } from 'src/users/users.service';
import { Comment } from './comment.entity';
import { CommentDto } from './comment.dto';
import { HelperFileLoader } from '../../utils/HelperFileLoader';

const PATH_COMMENTS = '/images/';
const helperFileLoader = new HelperFileLoader();
helperFileLoader.path = PATH_COMMENTS;
@Controller('api/news/:newsId/comments')
export class CommentsController {
  constructor(
    private commentsService: CommentsService,
    private usersService: UsersService,
  ) {}

  @Get()
  async getAllComments(@Param('newsId') newsId: number): Promise<Comment[]> {
    return this.commentsService.findAllByNews(newsId);
  }

  @Get(':commentId')
  async getById(@Param('commentId') commentId: number): Promise<Comment> {
    return this.commentsService.findById(commentId);
  }

  @Post()
  async create(@Body() commentDto: CommentDto): Promise<Comment> {
    let newComment = new Comment();

    const user = await this.usersService.findById(commentDto.userId);
    if (!user) {
      new HttpException('User is not found!', HttpStatus.BAD_REQUEST);
    }

    if (commentDto.parentId) {
      newComment.parent = await this.commentsService.findById(
        commentDto.parentId,
      );
    }
    newComment = {
      ...newComment,
      ...commentDto,
      user,
    };

    return this.commentsService.create(newComment);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() commentDto: CommentDto,
  ): Promise<Comment> {
    const user = await this.usersService.findById(commentDto.userId);
    if (!user) {
      new HttpException('User is not found!', HttpStatus.BAD_REQUEST);
    }

    let updatedComment = await this.commentsService.findById(id);
    updatedComment = {
      ...updatedComment,
      ...commentDto,
      user,
      id,
    };

    return this.commentsService.update(updatedComment);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<Comment> {
    return this.commentsService.remove(id);
  }
}
