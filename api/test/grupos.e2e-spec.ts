import { Test, TestingModule } from '@nestjs/testing';
import { GruposController } from '../src/grupos/grupos.controller';
import { GruposService } from '../src/grupos/grupos.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { GruposModule } from '../src/grupos/grupos.module';
import { CreateGrupoDto } from '../src/grupos/dto/create-grupo.dto';
import { UpdateAtividadeDto } from '../src/atividades/dto/update-atividade.dto';

describe('grupos integração', () => {
    let controller: GruposController;
    let Service: GruposService;
  
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [GruposController],
        providers: [GruposService, PrismaService],
        imports: [GruposModule],
        }).compile();
    
        controller = module.get<GruposController>(GruposController);
        Service = module.get<GruposService>(GruposService);
    });
    
    describe('FindAll', () => {
        it('Devo retornar uma array de objetos', async () => {
            const result = await controller.findAll();
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe('FindOne', () => {
        it('Devo retornar um objeto grupo com o mesmo id que foi informado no teste', async () => {
            const result = await controller.findOne('2');
            expect(result.nome).toBe('teste2');
            //deve ser o mesmo id que foi informado no input do controller
            expect(result.id).toBe(2); 
        });
        it('devo retornar um erro pois o id não existe no banco', async () => {
            try {
                await controller.findOne('90');
            } catch(error){
                expect(error).toThrowError();
            }
        });
    });

    describe('Create', () => {
        it('Deve rotorna o grupo criado e o tamanho atualizado do banco', async () => {
            const dto = new CreateGrupoDto
            dto.nome = "testeCreate"
            const result = await controller.create(dto);
            //verifica se o nome é o mesmo que foi colocado no dto
            expect(result.nome).toBe(dto.nome);
            const lenght = await controller.findAll()
            expect(lenght.length).toBe(4); 
        });
        it('devo retornar um erro pois não foi setado o nome', async () => {
            const dto = new CreateGrupoDto
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
        it('Devo retornar um objeto grupo com o mesmo nome e id que foi informado no teste', async () => {
            const dto = new UpdateAtividadeDto
            dto.nome = 'teste de alteracao'
            const result = await controller.update('1', dto);
            expect(result.nome).toBe(dto.nome);
            //deve ser o mesmo id que foi informado no input do controller
            expect(result.id).toBe(1); 
        });
        it('devo retornar um erro pois o id não existe no banco', async () => {
            const dto = new UpdateAtividadeDto
            try {
                await controller.update('30', dto);
            } catch(err){
                function error() {
                    throw new Error('Usuario não encontrado');
                }
                expect(error).toThrowError();
            }
        });
    });

    describe('delete', () => {
        it('Devo retornar um objeto grupo com o mesmo id que foi informado no teste', async () => {
            const result = await controller.remove('2')
            expect(result.nome).toBe('teste2');
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
});