import { Module } from '@nestjs/common';
import { AtividadesService } from './atividades.service';
import { AtividadesController } from './atividades.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [AtividadesController],
  providers: [AtividadesService],
  imports: [PrismaModule]
})
export class AtividadesModule {}
