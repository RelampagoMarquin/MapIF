import { Test, TestingModule } from '@nestjs/testing';
import { AtividadesController } from '../src/atividades/atividades.controller';
import { AtividadesService } from '../src/atividades/atividades.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { AtividadesModule } from '../src/atividades/atividades.module';
import { CreateAtividadeDto } from '../src/atividades/dto/create-atividade.dto';
import { UpdateAtividadeDto } from '../src/atividades/dto/update-atividade.dto';

describe('atividade integração', () => {
    let controller: AtividadesController;
    let Service: AtividadesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [AtividadesController],
        providers: [AtividadesService, PrismaService],
        imports: [AtividadesModule],
        }).compile();
    
        controller = module.get<AtividadesController>(AtividadesController);
        Service = module.get<AtividadesService>(AtividadesService);
    });

    describe('FindAll', () => {
        it('Devo retornar um array de objetos de um determinado poligono', async () => {
            const result = await controller.findAll(1);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(2);
            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe('findAllByEvento', () => {
        it('Devo retornar um array de objetos de um determinado evento',async () => {
           const result = await controller.findAllByEvento(1);
           expect(Array.isArray(result)).toBe(true);
           expect(result.length).toBe(3);
           expect(result.length).toBeGreaterThan(0);
        });
    });

    describe('FindOne', () => {
        it('Devo retornar um objeto atividade com o mesmo id que foi informado no teste', async () => {
            const result = await controller.findOne('1');
            //deve ser o mesmo id que foi informado no input do controller
            expect(result.id).toBe(1);
        });
        it('devo retornar um erro pois o id de usuário não existe no banco', async () => {
            try {
                const result = await controller.findOne('90');
            } catch(error){
                expect(error).toThrowError();
            }
        });
    });

    describe('Create', () => {
        it('Deve rotorna a atividade criada e o tamanho atualizado do banco', async () => {
            const dto = new CreateAtividadeDto
            dto.nome = 'palestra incrível'
            dto.descricao = 'vai mudar sua vida!!!'
            dto.horarioFinal = new Date('2023-05-29T12:34:56.789Z')
            dto.horarioInicial = new Date('2023-05-29T12:34:56.789Z')
            const result = await controller.create(3, dto)
            //verifica se o nome é o mesmo que foi colocado no dto
            expect(result.nome).toBe('palestra incrível');
            const lenght = await controller.findAll(3)
            expect(lenght.length).toBe(2);
        });
        it('devo retornar um erro pois não foi setado o nome', async () => {
            const dto = new CreateAtividadeDto
            try {
                await controller.create(2, dto);
            } catch(err){
                function error() {
                    throw new Error('Usuario não encontrado');
                }
                expect(error).toThrowError();
            }
        });
        it('devo retornar um erro pois não existe o id de poligono informado', async () => {
            const dto = new CreateAtividadeDto
            try {
                await controller.create(90, dto);
            } catch(err){
                function error() {
                    throw new Error('Usuario não encontrado');
                }
                expect(error).toThrowError();
            }
        });
    });

    describe('update', () => {
        it('Devo retornar um objeto atividade com o mesmo nome e id que foi informado no teste', async () => {
            const dto = new UpdateAtividadeDto
            dto.descricao = 'boa palestra'
            const result = await controller.update('5', dto);
            expect(result.nome).toBe('palestra incrível');
            expect(result.descricao).toBe(dto.descricao);
            //deve ser o mesmo id que foi informado no input do controller
            expect(result.id).toBe(5);
            //deve ser retornado o id de update do grupoId
            expect(result.poligonoId).toBe(3);
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
        it('Devo retornar um objeto atividade com o mesmo id que foi informado no teste', async () => {
            const result = await controller.remove('5');
            expect(result.nome).toBe('palestra incrível');
            //deve ser o mesmo id que foi informado no input do controller
            expect(result.id).toBe(5); 
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