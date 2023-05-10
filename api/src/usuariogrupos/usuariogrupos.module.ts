import { Module } from '@nestjs/common';
import { UsuariogruposService } from './usuariogrupos.service';
import { UsuariogruposController } from './usuariogrupos.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [UsuariogruposController],
  providers: [UsuariogruposService],
  imports: [PrismaModule]
})
export class UsuariogruposModule {}
