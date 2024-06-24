import { Body, Controller, ForbiddenException, Get, HttpException, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async(@Body() data: LoginDTO){
    try {
      return this.authService.signIn(data);
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
