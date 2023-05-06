import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';

@Injectable()
export class GruposService {
  constructor(private prisma: PrismaService) {}

  async create(createGrupoDto: CreateGrupoDto) {
    return this.prisma.grupos.create({data: createGrupoDto});
  }

  async findAll() {
    return this.prisma.grupos.findMany();
  }

  async findOne(id: number) {
    return this.prisma.grupos.findUnique({
      where: {id},
      include: {
        usuarioGrupo: {
          include: {
            usuario: {
              select: {
                nome:true,
                email:true
              }
            }
          }
        }
      }
      
    });
  }

  async update(id: number, updateGrupoDto: UpdateGrupoDto) {
    return this.prisma.grupos.update({
      where: {id},
      data: updateGrupoDto,
    });
  }

  async remove(id: number) {
    return this.prisma.grupos.delete({where: {id}});
  }
}
