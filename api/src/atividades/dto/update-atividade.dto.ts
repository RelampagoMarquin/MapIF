import { PartialType } from '@nestjs/swagger';
import { CreateAtividadeDto } from './create-atividade.dto';

export class UpdateAtividadeDto extends PartialType(CreateAtividadeDto) {}
