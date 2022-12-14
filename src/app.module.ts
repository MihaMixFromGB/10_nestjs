import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { CalculatorModule } from './calculator/calculator.module';
import { MailModule } from './mail/mail.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';

import { User } from './users/user.entity';
import { News } from './news/news.entity';
import { Category } from './categories/category.entity';
import { Comment } from './news/comments/comment.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, News, Category, Comment],
      synchronize: true,
    }),
    NewsModule,
    CalculatorModule,
    MailModule,
    UsersModule,
    CategoriesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
