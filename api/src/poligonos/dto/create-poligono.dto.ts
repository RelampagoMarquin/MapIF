import { ApiProperty } from "@nestjs/swagger";

export class CreatePoligonoDto {

    @ApiProperty()
    eventoId: number;
}
