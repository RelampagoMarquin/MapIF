import { Module } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [EventosController],
  providers: [EventosService],
  imports: [PrismaModule]
})
export class EventosModule { }
