import { ApiProperty } from "@nestjs/swagger";
import { isString } from "util";

export class CreateUserDto {
    @ApiProperty({description: "User email"})
    email: string;
    @ApiProperty({description: "User password"})
    password: string;
}
