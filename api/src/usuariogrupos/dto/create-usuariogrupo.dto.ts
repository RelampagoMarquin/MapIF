import { ApiProperty } from "@nestjs/swagger";

export class CreateUsuariogrupoDto {

    @ApiProperty()
    usuarioId: number;

    @ApiProperty()
    grupoId: number;

    @ApiProperty()
    isAdmin: boolean;

}
