import { ApiProperty } from "@nestjs/swagger";

export class CreateGrupoDto {
    
    @ApiProperty()
    nome: string;
}
