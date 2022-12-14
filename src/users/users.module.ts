import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UsersViewController } from './users.view/users.view.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController, UsersViewController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
