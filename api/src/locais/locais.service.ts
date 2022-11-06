import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLocaiDto } from './dto/create-locai.dto';
import { UpdateLocaiDto } from './dto/update-locai.dto';

@Injectable()
export class LocaisService {
  constructor(private prisma: PrismaService) { }

  create(createLocaiDto: CreateLocaiDto) {
    return this.prisma.local.create({ data: createLocaiDto });
  }

  findAll() {
    return this.prisma.local.findMany();
  }

  findOne(id: number) {
    return this.prisma.local.findUnique({ where: { id } });
  }

  update(id: number, updateLocaiDto: UpdateLocaiDto) {
    return this.prisma.local.update({
      where: { id },
      data: updateLocaiDto
    });
  }

  remove(id: number) {
    return this.prisma.local.delete({ where: { id } });
  }
}
