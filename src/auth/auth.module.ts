import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { IRepository } from 'src/common/interfaces/repository.interface.';
import { UserRepository } from 'src/user/user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: 60
      }
    }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,UserService,{
    provide: IRepository,
    useFactory: ()=> new UserRepository(new PrismaService)
  }],
})
export class AuthModule {}
