import { ApiProperty } from "@nestjs/swagger";
import { Atividade } from "@prisma/client";

export class atividadesEntity implements Atividade {
    @ApiProperty()
    id: number;

    @ApiProperty()
    nome: string;

    @ApiProperty()
    horarioInicial: Date;

    @ApiProperty()
    horarioFinal: Date;

    @ApiProperty()
    descricao: string;

    @ApiProperty()
    poligonoId: number;
}
