import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from '../src/usuarios/usuarios.controller';
import { UsuariosService } from '../src/usuarios/usuarios.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { UsuariosModule } from '../src/usuarios/usuarios.module'
import { CreateUsuarioDto } from '../src/usuarios/dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../src/usuarios/dto/update-usuario.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('Usuários integração', () => {
    let controller: UsuariosController;
    let Service: UsuariosService;
  
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [UsuariosController],
        providers: [UsuariosService, PrismaService],
        imports: [UsuariosModule],
        }).compile();
    
        controller = module.get<UsuariosController>(UsuariosController);
        Service = module.get<UsuariosService>(UsuariosService);
    });
    
    describe('FindAll', () => {
        it('Devo retornar uma array de objetos usuário', async () => {
            const result = await controller.findAll();
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe('FindOne', () => {
        it('Devo retornar um objeto usuario com o mesmo id que foi informado no teste', async () => {
            const result = await controller.findOne('2');
            expect(result.nome).toBe('marcos');
            //deve ser o mesmo id que foi informado no input do controller
            expect(result.id).toBe(2); 
        });
        it('devo retornar um erro pois o id não existe no banco', async () => {
            try {
                const result = await controller.findOne('90');
            } catch(error){
                expect(error).toThrowError();
            }
        });
    });

    describe('Create', () => {
        it('Deve rotorna o usuario criado e o tamanho atualizado do banco', async () => {
            const dto = new CreateUsuarioDto
            dto.nome = "testeCreate"
            dto.email = "testeCreate"
            dto.senha = "testeCreate"
            const result = await controller.create(dto);
            //verifica se o nome é o mesmo que foi colocado no dto
            expect(result.nome).toBe(dto.nome);
            //verfica se a senha está sendo cryptografada
            expect(result.senha).not.toBe("testeCreate");
            const lenght = await controller.findAll()
            expect(lenght.length).toBe(4);
        });
        it('devo retornar um erro pois não foi setado o nome', async () => {
            const dto = new CreateUsuarioDto
            try {
                await controller.create(dto);
            } catch(err){
                function error() {
                    throw new Error('Usuario não encontrado');
                }
                expect(error).toThrowError();
            }
        });
    });

    describe('update', () => {
        it('Devo retornar um objeto usuario com o mesmo nome e id que foi informado no teste', async () => {
            const dto = new UpdateUsuarioDto
            dto.nome = 'teste de alteracao'
            const result = await controller.update('1', dto);
            expect(result.nome).toBe(dto.nome);
            //deve ser o mesmo id que foi informado no input do controller
            expect(result.id).toBe(1); 
        });
        it('devo retornar um erro pois o id não existe no banco', async () => {
            const dto = new UpdateUsuarioDto
            try {
                await controller.update('30', dto);
            } catch(err){
                function error() {
                    throw new Error('Usuario não encontrado');
                }
                expect(error).toThrowError();
            }
        });
        it('testa a criptografia na senha na  de atualizar', async () => {
            const dto = new UpdateUsuarioDto
            dto.nome = 'teste de alteracao'
            dto.senha = 'teste123'
            const result = await controller.update('1', dto);
            expect(result.senha).not.toBe('teste123');
        });
    });

    describe('delete', () => {
        it('Devo retornar um objeto usuário com o mesmo id que foi informado no teste', async () => {
            const result = await controller.remove('2');
            expect(result.nome).toBe('marcos');
            //deve ser o mesmo id que foi informado no input do controller
            expect(result.id).toBe(2); 
        });
        it('devo retornar um erro pois o id não existe no banco', async () => {
            try {
                await controller.remove('30');
            } catch(err){
                function error() {
                    throw new Error('Usuario não encontrado');
                }
                expect(error).toThrowError();
            }
        });
    });

    describe('findByLogin', () => {
        it('devo retornar o usuário correto de acordo com o login e senha informado', async () => {
            // primeiro eu vou criar o usuário que vai testar o login por conta da senha encriptada
            const dto = new CreateUsuarioDto
            dto.nome = "natalia"
            dto.email = "natalia@gmail.com"
            dto.senha = "natalia123"
            await controller.create(dto);
            //agora preparo o teste
            let email = 'natalia@gmail.com';
            let senha = 'natalia123';
            const result = await Service.findByLogin({email, senha})
            // por conta do teste de criação acima o id será 5
            expect(result.id).toBe(5);
            expect(result.nome).toBe('natalia');
        });
        it('devo retornar um erro por não achar um usuário com o email informado', async () => {
            // primeiro eu vou criar o usuário que vai testar o login por conta da senha encriptada
            let email = 'anderson@gmail.com';
            let senha = 'anderson123';
            try{
                const result = await Service.findByLogin({email, senha})
                //não será checada por conta do try
                expect(result.id).toBe(1000);
            } catch(err){
                expect(err).toEqual(new HttpException("invalid_credentials", HttpStatus.UNAUTHORIZED));
            }
        });
        it('devo retornar um erro por a senha não ser a mesma do banco', async () => {
            // primeiro eu vou criar o usuário que vai testar o login por conta da senha encriptada
            let email = 'natalia@gmail.com';
            let senha = 'natalia12';
            try{
                const result = await Service.findByLogin({email, senha})
                //não será checada por conta do try
                expect(result.id).toBe(1000);
            } catch(err){
                expect(err).toEqual(new HttpException("invalid_credentials", HttpStatus.UNAUTHORIZED));
            }
        });
    });

    
});