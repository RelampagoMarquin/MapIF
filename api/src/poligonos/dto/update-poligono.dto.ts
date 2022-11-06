import { PartialType } from '@nestjs/swagger';
import { CreatePoligonoDto } from './create-poligono.dto';

export class UpdatePoligonoDto extends PartialType(CreatePoligonoDto) {}
