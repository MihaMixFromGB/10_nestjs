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

import { NewsService } from './news.service';
import { NewsDto } from './news.dto';
import { News } from './news.entity';

import { HelperFileLoader } from '../utils/HelperFileLoader';
import { FileTypeValidator } from '../utils/FileTypeValidator';

import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/categories.service';
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
    private usersService: UsersService,
    private categoriesService: CategoriesService,
    private mailService: MailService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The news have been successfully found.',
  })
  async getAll(): Promise<News[]> {
    return this.newsService.findAll();
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
  async getById(@Param('id') id: number): Promise<News> {
    try {
      return this.newsService.findById(id);
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
  async create(@Body() newsDto: NewsDto): Promise<News> {
    const author = await this.usersService.findById(newsDto.authorId);
    if (!author) {
      new HttpException('Author is not found!', HttpStatus.BAD_REQUEST);
    }

    const category = await this.categoriesService.findById(newsDto.categoryId);
    if (!category) {
      new HttpException('Category is not found!', HttpStatus.BAD_REQUEST);
    }

    let newNews = new News();
    delete newsDto.authorId;
    delete newsDto.categoryId;
    newNews = await this.newsService.create({
      ...newNews,
      ...newsDto,
      cover: !newsDto?.cover ? '' : PATH_NEWS + newsDto.cover,
      author,
      category,
    });

    // await this.mailService.sendNewNewsForAdmins(newNews);

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
  async uploadImage(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
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
  async update(
    @Param('id') id: number,
    @Body() newsDto: NewsDto,
  ): Promise<News> {
    try {
      const author = await this.usersService.findById(newsDto.authorId);
      if (!author) {
        new HttpException('Author is not found!', HttpStatus.BAD_REQUEST);
      }

      const category = await this.categoriesService.findById(
        newsDto.categoryId,
      );
      if (!category) {
        new HttpException('Category is not found!', HttpStatus.BAD_REQUEST);
      }

      const existedNews = await this.newsService.findById(id);
      let updatedNews = new News();
      delete newsDto.authorId;
      delete newsDto.categoryId;
      updatedNews = await this.newsService.update({
        ...updatedNews,
        ...newsDto,
        author,
        category,
        id,
      });

      this.mailService.sendEditedNewsForAdmins(existedNews, updatedNews);

      return updatedNews;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The news has been successfully removed.',
  })
  async remove(@Param('id') id: number): Promise<News> {
    return this.newsService.remove(id);
  }
}
