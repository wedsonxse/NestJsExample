import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UserService } from 'src/user/user.service';
import { IRepository } from 'src/common/interfaces/repository.interface.';
import { UserRepository } from 'src/user/user.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LoginController],
  providers: [LoginService,UserService,{
    provide: IRepository,
    useFactory: ()=> new UserRepository(new PrismaService)
  }],
})
export class LoginModule {}
