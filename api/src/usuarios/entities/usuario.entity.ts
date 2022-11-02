import { ApiProperty } from "@nestjs/swagger";
import { Usuarios } from "@prisma/client";

export class usuariosEntity implements Usuarios {

    @ApiProperty()
    id: number;

    @ApiProperty()
    nome: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    senha: string

}