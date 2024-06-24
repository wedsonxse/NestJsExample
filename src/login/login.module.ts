import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UserService } from 'src/user/user.service';
import { IRepository } from 'src/common/interfaces/repository.interface.';
import { UserRepository } from 'src/user/user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: 30
      }
    }),
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService,UserService,{
    provide: IRepository,
    useFactory: ()=> new UserRepository(new PrismaService)
  }],
})
export class LoginModule {}
