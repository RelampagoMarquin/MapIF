import { PartialType } from '@nestjs/swagger';
import { CreateGrupoDto } from './create-grupo.dto';

export class UpdateGrupoDto extends PartialType(CreateGrupoDto) {}
