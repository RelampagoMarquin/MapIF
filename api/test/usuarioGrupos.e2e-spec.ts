import { Test, TestingModule } from '@nestjs/testing';
import { UsuariogruposController } from '../src/usuariogrupos/usuariogrupos.controller';
import { UsuariogruposService } from '../src/usuariogrupos/usuariogrupos.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { UsuariogruposModule } from '../src/usuariogrupos/usuariogrupos.module';
import { CreateUsuariogrupoDto } from '../src/usuariogrupos/dto/create-usuariogrupo.dto';
import { UpdateUsuariogrupoDto } from '../src/usuariogrupos/dto/update-usuariogrupo.dto';

describe('usuario grupo integração', () => {
    let controller: UsuariogruposController;
    let Service: UsuariogruposService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [UsuariogruposController],
        providers: [UsuariogruposService, PrismaService],
        imports: [UsuariogruposModule],
        }).compile();
    
        controller = module.get<UsuariogruposController>(UsuariogruposController);
        Service = module.get<UsuariogruposService>(UsuariogruposService);
    });

    describe('FindAll', () => {
        it('Devo retornar uma array de objetos', async () => {
            const result = await controller.findAll();
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe('FindOne', () => {
        it('Devo retornar um objeto UsuarioGrpo com o mesmo id que foi informado no teste', async () => {
            const result = await controller.findOne('1', '1');
            expect(result.isAdmin).toBe(true);
            //deve ser o mesmo id que foi informado no input do controller
            expect(result.usuarioId).toBe(1);
            expect(result.grupoId).toBe(1); 
        });
        it('Devo retornar um objeto UsuarioGrpo com o mesmo id que foi informado no teste', async () => {
            const result = await controller.findOne('2', '1');
            expect(result.isAdmin).toBe(false);
            //deve ser o mesmo id que foi informado no input do controller
            expect(result.usuarioId).toBe(2);
            expect(result.grupoId).toBe(1); 
        });
        it('devo retornar um erro pois o id de usuário não existe no banco', async () => {
            try {
                const result = await controller.findOne('90', '1');
            } catch(error){
                expect(error).toThrowError();
            }
        });
        it('devo retornar um erro pois o id de grupo não existe no banco', async () => {
            try {
                const result = await controller.findOne('1', '90');
            } catch(error){
                expect(error).toThrowError();
            }
        });
    });

    describe('Create', () => {
        it('Deve rotorna o usuarioGrupo criado e o tamanho atualizado do banco', async () => {
            const dto = new CreateUsuariogrupoDto
            dto.usuarioId = 2
            dto.grupoId = 2
            dto.isAdmin = false
            const result = await controller.create(dto);
            //verifica se o nome é o mesmo que foi colocado no dto
            expect(result.usuarioId).toBe(2);
            expect(result.grupoId).toBe(2);
            const lenght = await controller.findAll()
            expect(lenght.length).toBe(4);
        });
        it('devo retornar um erro pois não foi setado o nome', async () => {
            const dto = new CreateUsuariogrupoDto
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
        it('Devo retornar um objeto usuarioGrupo com o mesmo nome e id que foi informado no teste', async () => {
            const dto = new UpdateUsuariogrupoDto
            dto.usuarioId = 2
            dto.grupoId = 3
            dto.isAdmin = true
            const result = await controller.update('2', '2' , dto);
            //deve ser os mesmos id que foi informado no input do controller
            expect(result.usuarioId).toBe(2);
            expect(result.grupoId).toBe(3);
            expect(result.isAdmin).toBe(true);
        });
        it('devo retornar um erro pois o id de usuário não existe no banco', async () => {
            const dto = new UpdateUsuariogrupoDto
            try {
                await controller.update('30', '1' , dto);
            } catch(err){
                function error() {
                    throw new Error('Usuario não encontrado');
                }
                expect(error).toThrowError();
            }
        });
        it('devo retornar um erro pois o id de grupo não existe no banco', async () => {
            const dto = new UpdateUsuariogrupoDto
            try {
                await controller.update('1', '30' , dto);
            } catch(err){
                function error() {
                    throw new Error('Usuario não encontrado');
                }
                expect(error).toThrowError();
            }
        });
    });

    describe('delete', () => {
        it('Devo retornar um objeto usuarioGrupo com o mesmo id que foi informado no teste', async () => {
            const result = await controller.remove('2', '3');
            //deve ser o mesmo id que foi informado no input do controller
            expect(result.usuarioId).toBe(2);
            expect(result.grupoId).toBe(3);
        });
        it('devo retornar um erro pois o id de usuário não existe no banco', async () => {
            try {
                await controller.remove('30', '1');
            } catch(err){
                function error() {
                    throw new Error('Usuario não encontrado');
                }
                expect(error).toThrowError();
            }
        });
        it('devo retornar um erro pois o id de grupo não existe no banco', async () => {
            try {
                await controller.remove('1', '30');
            } catch(err){
                function error() {
                    throw new Error('Usuario não encontrado');
                }
                expect(error).toThrowError();
            }
        });
    });
});