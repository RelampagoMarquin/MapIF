import { ApiProperty } from "@nestjs/swagger";

export class CreateEventoDto {
    @ApiProperty()
    nome: string;

    @ApiProperty()
    latitude?: string;

    @ApiProperty()
    longitude?: string;

    @ApiProperty()
    comeca: Date;

    @ApiProperty()
    fim: Date;

    @ApiProperty()
    grupoId: number;

    @ApiProperty()
    isPublic: boolean

    @ApiProperty()
    descricao: string;
}
