import { ApiProperty } from "@nestjs/swagger";
import { Poligonos } from "@prisma/client";

export class poligonosEntity implements Poligonos {
    @ApiProperty()
    id: number;

    @ApiProperty()
    eventoId: number;
}
