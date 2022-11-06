import { ApiProperty } from "@nestjs/swagger";
import { Grupos } from "@prisma/client";

export class GruposEntity implements Grupos {

    @ApiProperty()
    id: number;

    @ApiProperty()
    nome: string;
}
