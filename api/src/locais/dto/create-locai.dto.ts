import { ApiProperty } from "@nestjs/swagger";

export class CreateLocaiDto {

    @ApiProperty()
    latitude: string;

    @ApiProperty()
    longitude: string;

    @ApiProperty()
    poligonoId: number;
}
