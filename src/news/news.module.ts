import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsVmController } from './news.view/news.view.controller';
import { NewsService } from './news.service';
import { CommentsModule } from './comments/comments.module';
import { MailModule } from '../mail/mail.module';

@Module({
  controllers: [NewsController, NewsVmController],
  providers: [NewsService],
  imports: [CommentsModule, MailModule],
})
export class NewsModule {}
