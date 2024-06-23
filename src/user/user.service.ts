import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IRepository } from 'src/common/interfaces/repository.interface.';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(@Inject(IRepository) private readonly repository: IRepository<User,CreateUserDto>) {}

  async createUser(data: CreateUserDto) {
    try {      
      return await this.repository.create(data)
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllUsers() {
    return await this.repository.findAll();
  }

  async findUserById(id: string) {
    return await this.repository.findOne(id);
  }

  async updateUser(id: string, data: UpdateUserDto) {
    return await this.repository.update(id,data);
  }

  async removeUserById(id: string) {
    return await this.repository.delete(id)
  }
}
