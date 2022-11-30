import { ApiProperty } from "@nestjs/swagger";

export class LoginUsuarioDto {

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly senha: string;
}

export class UpdatePasswordDto {

    @ApiProperty() 
    nova_senha: string;

    @ApiProperty() 
    senha_velha: string;

}