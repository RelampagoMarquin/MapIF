import { ApiProperty } from "@nestjs/swagger";
import { UsuarioGrupo } from "@prisma/client";

export class usuariogrupoEntity implements UsuarioGrupo {

    @ApiProperty()
    usuarioId: number;

    @ApiProperty()
    grupoId: number;

    @ApiProperty()
    isAdmin: boolean;

    constructor(partial: Partial<usuariogrupoEntity>) {
        Object.assign(this, partial);
    }
}
