import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserDto } from './user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<User> {
    return this.usersService.findById(id);
  }

  @Post()
  create(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.create(userDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() userDto: UserDto): Promise<User> {
    return this.usersService.update(id, userDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<User> {
    return this.usersService.remove(id);
  }
}
