import { Body, Controller, ForbiddenException, Get, HttpException, Post, Request, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from './login.guard';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async(@Body() data: LoginDTO){
    try {
      return this.loginService.authorize(data);
    } catch (error) {
      throw new ForbiddenException('Erro de autoização...')
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req){
    return req.user
  }
}
