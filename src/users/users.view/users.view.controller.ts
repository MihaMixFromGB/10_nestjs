import {
  Controller,
  Get,
  Post,
  Render,
  Param,
  Body,
  Request,
  Response,
  HttpException,
} from '@nestjs/common';
import axios from 'axios';
import { UserDto } from '../user.dto';
import { UsersService } from '../users.service';

@Controller('users')
export class UsersViewController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  @Render('profile')
  async getProfile(@Param('id') id: number) {
    const user = this.usersService.findById(id);
    return user;
  }

  @Post(':id')
  async updateProfile(
    @Request() req,
    @Response() res,
    @Param('id') id: number,
    @Body() userDto: UserDto,
  ) {
    return await axios
      .patch(`${process.env.BASE_URL}/api/users/${id}`, userDto, {
        headers: { Authorization: `Bearer ${req.cookies.token}` },
      })
      .then(() => res.redirect('/users/1'))
      .catch((err) => {
        const { statusCode, message } = err.response.data;
        throw new HttpException(message, statusCode);
      });
  }
}
