import { ApiProperty } from "@nestjs/swagger";

export class CreateAtividadeDto {

    @ApiProperty()
    nome: string;

    @ApiProperty()
    isPublic: boolean

    @ApiProperty()
    horarioInicial: Date;

    @ApiProperty()
    horarioFinal: Date;

    @ApiProperty()
    descricao: string;

    @ApiProperty()
    poligonoId: number;
}
