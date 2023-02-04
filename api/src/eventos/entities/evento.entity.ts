import { ApiProperty } from "@nestjs/swagger";
import { Eventos } from "@prisma/client";

export class eventosEntity implements Eventos {

    @ApiProperty()
    id: number;

    @ApiProperty()
    nome: string;

    @ApiProperty()
    comeca: Date;

    @ApiProperty()
    fim: Date;

    @ApiProperty()
    grupoId: number;

    @ApiProperty()
    isPublic: boolean;

    @ApiProperty()
    descricao: string;
}
