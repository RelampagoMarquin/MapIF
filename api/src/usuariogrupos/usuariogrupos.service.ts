import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuariogrupoDto } from './dto/create-usuariogrupo.dto';
import { UpdateUsuariogrupoDto } from './dto/update-usuariogrupo.dto';

@Injectable()
export class UsuariogruposService {
  constructor (private prisma: PrismaService){}

  create(createUsuariogrupoDto: CreateUsuariogrupoDto) {
    return this.prisma.usuarioGrupo.create({data: createUsuariogrupoDto});
  }

  findAll() {
    return this.prisma.usuarioGrupo.findMany();
  }

  findOne(usuarioId, grupoId) {
    return this.prisma.usuarioGrupo.findUnique({where: 
      { usuarioId_grupoId: {usuarioId, grupoId}}});
  }

  update(usuarioId, grupoId, updateUsuariogrupoDto: UpdateUsuariogrupoDto) {
    return this.prisma.usuarioGrupo.update({
      where: { usuarioId_grupoId: {usuarioId, grupoId}},
      data: updateUsuariogrupoDto
    });
  }

  remove(usuarioId, grupoId,) {
    return this.prisma.usuarioGrupo.delete({where: { usuarioId_grupoId: {usuarioId, grupoId}}});
  }
}
