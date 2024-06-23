import { HttpException, Injectable } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {

    constructor(private readonly userService: UserService) {}

    async authorize(data: LoginDTO){
        try {
            const user: User = await this.userService.findUserByEmail({email: data.email})

            if(!user) throw new Error('O email não existe no banco de dados...')

            const isMatch = bcrypt.compareSync(data.password,user.password)

            if(!isMatch) throw new Error('senha incorreta...')
            
            return 'deu certo... mandar um token JWT de volta'

        } catch (error) {
            throw new Error(error)
        }
    }
}
