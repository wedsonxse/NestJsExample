import { Body, Controller, ForbiddenException, HttpException, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDTO } from './dto/login.dto';

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
}
