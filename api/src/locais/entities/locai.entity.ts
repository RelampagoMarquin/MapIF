import { ApiProperty } from "@nestjs/swagger";
import { Local } from "@prisma/client";

export class LocaisEntity implements Local {
    @ApiProperty()
    id: number;

    @ApiProperty()
    latitude: string;

    @ApiProperty()
    longitude: string;

    @ApiProperty()
    poligonoId: number;
}
