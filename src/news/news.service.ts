import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { News } from './news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async findAll(): Promise<News[]> {
    return await this.newsRepository.find({
      relations: ['author', 'category'],
    });
  }

  async findById(id: number): Promise<News> {
    return await this.newsRepository.findOne({
      where: { id },
      relations: ['author', 'category'],
    });
  }

  async findByAuthorId(authorId: number): Promise<News> {
    return await this.newsRepository.findOne({
      where: { author: { id: authorId } },
      relations: ['author', 'category'],
    });
  }

  async create(newNews: News): Promise<News> {
    return await this.newsRepository.save(newNews);
  }

  async update(updatedNews: News): Promise<News> {
    return await this.newsRepository.save(updatedNews);
  }

  async remove(id: number): Promise<News> {
    const deletedNews = await this.findById(id);

    return await this.newsRepository.remove(deletedNews);
  }
}
