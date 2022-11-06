import { ApiProperty } from "@nestjs/swagger";

export class CreateEventoDto {
    @ApiProperty()
    nome: string;

    @ApiProperty()
    comeca: Date;

    @ApiProperty()
    fim: Date;

    @ApiProperty()
    grupoId: number;
}
