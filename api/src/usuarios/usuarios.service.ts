import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginUsuarioDto } from './dto/login-user.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { usuariosEntity } from './entities/usuario.entity';

interface FormatLogin extends Partial<usuariosEntity> {
  email: string;
}

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    return this.prisma.usuarios.create({data: createUsuarioDto})
  }

  async findAll() {
    return this.prisma.usuarios.findMany();
  }

  async findOne(id: number) {
    return this.prisma.usuarios.findUnique({ where: { id } });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.prisma.usuarios.update({
      where: { id },
      data: updateUsuarioDto,
      });
  }

  async remove(id: number) {
    return this.prisma.usuarios.delete({ where: { id } });
  }

   //use by auth module to login user
   async findByLogin({ email, senha }: LoginUsuarioDto):
   Promise<FormatLogin> {
   const user = await this.prisma.usuarios.findFirst({
     where: { email }
   });

   if (!user) {
     throw new HttpException("invalid_credentials",
       HttpStatus.UNAUTHORIZED);
   }

   // compare passwords
   const areEqual = await compare(senha, user.senha);

   if (!areEqual) {
     throw new HttpException("invalid_credentials",
       HttpStatus.UNAUTHORIZED);
   }

   const { senha: p, ...rest } = user;
   return rest;
 }

 //use by auth module to get user in database
 async findByPayload({ email }: any): Promise<any> {
   return await this.prisma.usuarios.findFirst({
     where: { email }
   });
 }
}
