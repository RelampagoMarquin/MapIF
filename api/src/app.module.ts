import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { GruposModule } from './grupos/grupos.module';
import { EventosModule } from './eventos/eventos.module';
import { UsuariogruposModule } from './usuariogrupos/usuariogrupos.module';
import { PoligonosModule } from './poligonos/poligonos.module';
import { AtividadesModule } from './atividades/atividades.module';
import { LocaisModule } from './locais/locais.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule, UsuariosModule, GruposModule, EventosModule, UsuariogruposModule, PoligonosModule, AtividadesModule, LocaisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
