import { Module } from '@nestjs/common';
import { LocaisService } from './locais.service';
import { LocaisController } from './locais.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [LocaisController],
  providers: [LocaisService],
  imports: [PrismaModule]
})
export class LocaisModule {}
