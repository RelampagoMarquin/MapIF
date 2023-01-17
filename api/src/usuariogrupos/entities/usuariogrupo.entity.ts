import { ApiProperty } from "@nestjs/swagger";
import { usuarioGrupo } from "@prisma/client";

export class usuariogrupoEntity implements usuarioGrupo {

    @ApiProperty()
    usuarioId: number;

    @ApiProperty()
    grupoId: number;

    @ApiProperty()
    isAdmin: boolean;
}
