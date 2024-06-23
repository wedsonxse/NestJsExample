import { IRepository } from "src/common/interfaces/repository.interface.";
import { User } from "./entities/user.entity";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDTO } from "src/login/dto/login.dto";

export class UserRepository implements IRepository<User,CreateUserDto>{

    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateUserDto): Promise<User> {
        return await this.prisma.user.create({data})
    }

    async findByCondition(data: Partial<CreateUserDto>): Promise<User>{
        return await this.prisma.user.findUnique({where: {email: data.email}});
    }

    async findAll(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }

    async findOne(id: string): Promise<User> {
        return await this.prisma.user.findUnique({where: {id}})
    }

    async update(id: string, data: Partial<User>): Promise<User> {
        return await this.prisma.user.update({where: {id},data})
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({where: {id}})
    }
    
}