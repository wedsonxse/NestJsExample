import { HttpException, Injectable } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt'
import { authResponseDTO } from './dto/authResponse.dto';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService, private readonly jwt: JwtService) {}

    async signIn(data: LoginDTO): Promise<authResponseDTO> {
        try {
            const user: User = await this.userService.findUserByEmail({email: data.email})

            if(!user) throw new Error('Você ainda não possui uma conta, registre-se!')

            const isMatch = bcrypt.compareSync(data.password,user.password)

            if(!isMatch) throw new Error('Informações de E-mail/senha incorretas')
            
            return {token: await this.generateToken(user)}

        } catch (error) {
            throw new Error(error)
        }
    }

    async generateToken(user: User){
        const payload = {id: user.id, email: user.email} 
        return await this.jwt.signAsync(payload)
    }
}
