import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IRepository } from 'src/common/interfaces/IRepository';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

  constructor(private readonly repository: UserRepository) {}

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
