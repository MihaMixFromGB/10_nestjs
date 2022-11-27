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
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { News } from './news.interface';
import { NewsDto } from './news.dto';
import { NewsService } from './news.service';
import { HelperFileLoader } from '../utils/HelperFileLoader';
import { FileTypeValidator } from '../utils/FileTypeValidator';

import { MailService } from '../mail/mail.service';

const PATH_NEWS = '/images/';
const helperFileLoader = new HelperFileLoader();
helperFileLoader.path = PATH_NEWS;
const fileValidator = new FileTypeValidator();
@ApiTags('api/news')
@Controller('api/news')
export class NewsController {
  constructor(
    private newsService: NewsService,
    private readonly mailService: MailService,
  ) {}

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
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: helperFileLoader.destinationPath,
        filename: helperFileLoader.customFileName,
      }),
    }),
  )
  @ApiResponse({
    status: 201,
    description: 'The news has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Data validation has been failed.',
  })
  async createNews(
    @Body() newsDto: NewsDto,
    @UploadedFile() cover: Express.Multer.File,
  ): Promise<News> {
    let coverPath = '';
    if (cover?.filename?.length > 0) {
      coverPath = PATH_NEWS + cover.filename;
    }

    const newNews = this.newsService.create({
      ...newsDto,
      cover: coverPath,
    });

    await this.mailService.sendNewNewsForAdmins(newNews);

    return newNews;
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: helperFileLoader.destinationPath,
        filename: helperFileLoader.customFileName,
      }),
      fileFilter: fileValidator.fileFilter,
    }),
  )
  async upload(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    console.log('req.fileValidationError', req.fileValidationError);
    if (req.fileValidationError) {
      throw new HttpException(req.fileValidationError, HttpStatus.BAD_REQUEST);
    }

    return `${file.originalname} has been loaded!`;
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

      const existedNews = this.newsService.get(id);
      this.mailService.sendEditedNewsForAdmins(existedNews, updatedNews);

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
