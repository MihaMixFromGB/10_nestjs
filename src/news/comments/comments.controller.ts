import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Patch,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { CommentsService } from './comments.service';
import { Comment } from './comment.interface';
import { CommentDto } from './comment.dto';
import { HelperFileLoader } from '../../utils/HelperFileLoader';

const PATH_COMMENTS = '/images/';
const helperFileLoader = new HelperFileLoader();
helperFileLoader.path = PATH_COMMENTS;
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
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: helperFileLoader.destinationPath,
        filename: helperFileLoader.customFileName,
      }),
    }),
  )
  async create(
    @Body() commentDto: CommentDto,
    @UploadedFile() avatar: Express.Multer.File,
  ): Promise<Comment> {
    let avatarPath = '';
    if (avatar?.filename?.length > 0) {
      avatarPath = PATH_COMMENTS + avatar.filename;
    }

    return this.commentsService.create({
      ...commentDto,
      avatar: avatarPath,
    });
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
