import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {IRepository} from '../common/interfaces/repository.interface.'
import { UserRepository } from './user.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, {
    provide: IRepository,
    useFactory: ()=> new UserRepository(new PrismaService)
  }],
})
export class UserModule {}
