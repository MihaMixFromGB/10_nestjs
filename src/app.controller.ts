import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Render,
  Response,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('auth/login')
  @Render('auth-login')
  async auth() {
    return { email: 'batman@gmail.com', password: 'batman001' };
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Response() res) {
    // return this.authService.login(req.user);
    const { access_token } = await this.authService.login(req.user);
    res.cookie('token', access_token, {
      maxAge: parseInt(process.env.JWT_EXPIRESIN_SEC) * 1000,
    });
    return res.redirect('/news');
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
