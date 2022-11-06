import { Module } from '@nestjs/common';
import { PoligonosService } from './poligonos.service';
import { PoligonosController } from './poligonos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PoligonosController],
  providers: [PoligonosService],
  imports: [PrismaModule]
})
export class PoligonosModule {}
