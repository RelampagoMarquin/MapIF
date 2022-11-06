import { PartialType } from '@nestjs/swagger';
import { CreateLocaiDto } from './create-locai.dto';

export class UpdateLocaiDto extends PartialType(CreateLocaiDto) {}
