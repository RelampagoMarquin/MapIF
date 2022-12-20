import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLocaiDto } from './dto/create-locai.dto';
import { UpdateLocaiDto } from './dto/update-locai.dto';

@Injectable()
export class LocaisService {
  constructor(private prisma: PrismaService) { }

  async create(createLocaiDto: CreateLocaiDto) {
    return this.prisma.local.create({ data: createLocaiDto });
  }

  async findAll() {
    return this.prisma.local.findMany();
  }

  async findOne(id: number) {
    return this.prisma.local.findUnique({ where: { id } });
  }

  async update(id: number, updateLocaiDto: UpdateLocaiDto) {
    return this.prisma.local.update({
      where: { id },
      data: updateLocaiDto
    });
  }

  async remove(id: number) {
    return this.prisma.local.delete({ where: { id } });
  }
}
