import { IRepository } from "src/common/interfaces/IRepository";
import { User } from "./entities/user.entity";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";

export class UserRepository implements IRepository<User,CreateUserDto>{

    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateUserDto): Promise<User> {
        return await this.prisma.user.create({data})
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