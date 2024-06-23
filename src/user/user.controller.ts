import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {      
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      throw new BadRequestException(error.message,{cause: error.error, description: "Erro na criação de usuário"})
    }
  }

  @Get()
  async findAll() {
    return await this.userService.findAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findUserById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.removeUserById(id);
  }
}
