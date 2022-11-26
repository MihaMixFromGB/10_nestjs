import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';

import { News } from './news.interface';

@Injectable()
export class NewsService {
  private readonly news: News[] = [
    {
      id: '1',
      title: 'Peter Pan',
      description: 'Here must be a short description...',
      author: 'J.M. Barrie',
      cover: '/images/qJnUSuBesExYtg1762efZ.jpg',
      createdAt: '1904',
    },
    {
      id: '2',
      title: 'Hamlet',
      description: 'Here must be a short description...',
      author: ' William Shakespeare',
      cover: '/images/mElMqc1EuahvlM6uDqN1Z.jpg',
      createdAt: '1600',
    },
  ];

  create(item: Omit<News, 'id'>): News {
    const newNews = {
      ...item,
      id: nanoid(),
    };
    this.news.push(newNews);

    return newNews;
  }

  getAllNews(): News[] {
    return [...this.news];
  }

  get(id: string): News | null {
    const idx = this.news.findIndex((item) => item.id === id);
    if (idx === -1) {
      // return null;
      throw new Error('The news is not found!');
    }
    return { ...this.news[idx] };
  }

  update(newItem: News): boolean {
    const idx = this.news.findIndex((item) => item.id === newItem.id);
    if (idx === -1) {
      // return false;
      throw new Error('The news is not found!');
    }
    this.news[idx] = { ...newItem };
    return true;
  }

  remove(id: string): boolean {
    const idx = this.news.findIndex((item) => item.id === id);
    if (idx === -1) {
      return false;
    }
    this.news.splice(idx, 1);
    return true;
  }
}
