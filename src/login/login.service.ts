import { HttpException, Injectable } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'
import { authResponseDTO } from './dto/authResponse.dto';

@Injectable()
export class LoginService {

    constructor(private readonly userService: UserService) {}

    async authorize(data: LoginDTO): Promise<authResponseDTO> {
        try {
            const user: User = await this.userService.findUserByEmail({email: data.email})

            if(!user) throw new Error('Você ainda não possui uma conta, registre-se!')

            const isMatch = bcrypt.compareSync(data.password,user.password)

            if(!isMatch) throw new Error('Informações de E-mail/senha incorretas')
            
            return {token: this.generateToken(user)}

        } catch (error) {
            throw new Error(error)
        }
    }

    generateToken(user: User){
        return jwt.sign({email: user.email},process.env.JWT_SECRET,{expiresIn: '30m'})
    }
}
