import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuariogrupoDto } from './dto/create-usuariogrupo.dto';
import { UpdateUsuariogrupoDto } from './dto/update-usuariogrupo.dto';

@Injectable()
export class UsuariogruposService {
  constructor (private prisma: PrismaService){}

  async create(createUsuariogrupoDto: CreateUsuariogrupoDto) {
    return this.prisma.usuarioGrupo.create({data: createUsuariogrupoDto});
  }

  async findAll() {
    return this.prisma.usuarioGrupo.findMany();
  }

  async findOne(usuarioId, grupoId) {
    return this.prisma.usuarioGrupo.findUnique({where: 
      { usuarioId_grupoId: {usuarioId, grupoId}}});
  }

  async update(usuarioId, grupoId, updateUsuariogrupoDto: UpdateUsuariogrupoDto) {
    return this.prisma.usuarioGrupo.update({
      where: { usuarioId_grupoId: {usuarioId, grupoId}},
      data: updateUsuariogrupoDto
    });
  }

  remove(usuarioId, grupoId,) {
    return this.prisma.usuarioGrupo.delete({where: { usuarioId_grupoId: {usuarioId, grupoId}}});
  }
}
