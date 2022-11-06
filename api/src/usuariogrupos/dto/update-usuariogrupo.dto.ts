import { PartialType } from '@nestjs/swagger';
import { CreateUsuariogrupoDto } from './create-usuariogrupo.dto';

export class UpdateUsuariogrupoDto extends PartialType(CreateUsuariogrupoDto) {}
