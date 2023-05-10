import { Module } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { GruposController } from './grupos.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [GruposController],
  providers: [GruposService],
  imports: [PrismaModule]
})
export class GruposModule {}
