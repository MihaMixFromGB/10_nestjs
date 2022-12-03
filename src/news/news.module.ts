import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NewsController } from './news.controller';
import { NewsVmController } from './news.view/news.view.controller';
import { NewsService } from './news.service';
import { News } from './news.entity';
import { CommentsModule } from './comments/comments.module';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from '../users/users.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  controllers: [NewsController, NewsVmController],
  providers: [NewsService],
  imports: [
    TypeOrmModule.forFeature([News]),
    UsersModule,
    CategoriesModule,
    CommentsModule,
    MailModule,
  ],
})
export class NewsModule {}
