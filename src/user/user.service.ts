import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    try {      
      return this.prisma.user.create({data: createUserDto})
    } catch (error) {
      throw new BadRequestException(error.message,{cause: new Error(), description: "Erro na criação de usuário"})
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({where: { id }});
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({where: {id},data:updateUserDto});
  }

  remove(id: string) {
    return this.prisma.user.delete({where:{id}});
  }
}
