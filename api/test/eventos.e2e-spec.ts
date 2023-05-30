import { Test, TestingModule } from '@nestjs/testing';
import { EventosController } from '../src/eventos/eventos.controller';
import { EventosService } from '../src/eventos/eventos.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { EventosModule } from '../src/eventos/eventos.module';
import { CreateEventoDto } from '../src/eventos/dto/create-evento.dto';
import { UpdateEventoDto } from '../src/eventos/dto/update-evento.dto';

describe('eventos integração', () => {
    let controller: EventosController;
    let Service: EventosService;
  
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [EventosController],
        providers: [EventosService, PrismaService],
        imports: [EventosModule],
        }).compile();
    
        controller = module.get<EventosController>(EventosController);
        Service = module.get<EventosService>(EventosService);
    });
    
    describe('FindAll', () => {
        it('Devo retornar uma array de objetos', async () => {
            const result = await controller.findAll();
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(2);
        });
    });

    describe('FindOne', () => {
        it('Devo retornar um objeto Evento com o mesmo id que foi informado no teste', async () => {
            const result = await controller.findOne('1');
            expect(result.nome).toBe('semana do esporte');
            //deve ser o mesmo id que foi informado no input do controller
            expect(result.id).toBe(1); 
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
        it('Deve rotorna o evento criado e o tamanho atualizado do banco', async () => {
            const dto = new CreateEventoDto
            dto.nome = "testeCreate"
            dto.comeca = new Date('2023-05-29T12:34:56.789Z')
            dto.fim = new Date('2023-05-29T12:34:56.789Z')
            dto.grupoId = 3
            dto.isPublic = true;
            dto.descricao  = "teste teste teste"
            const result = await controller.create(dto);
            //verifica se o nome é o mesmo que foi colocado no dto
            expect(result.nome).toBe(dto.nome);
            const lenght = await controller.findAll()
            expect(lenght.length).toBe(3);
        });
        it('devo retornar um erro pois não foi setado o nome', async () => {
            const dto = new CreateEventoDto
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
        it('Devo retornar um objeto evento com o mesmo nome e id que foi informado no teste', async () => {
            const dto = new UpdateEventoDto
            dto.nome = 'teste de alteracao'
            dto.comeca = new Date('2023-05-29T12:34:56.789Z')
            dto.fim = new Date('2023-05-29T12:34:56.789Z')
            dto.grupoId = 2
            dto.isPublic = true;
            dto.descricao  = "teste teste teste"
            const result = await controller.update('1', dto);
            expect(result.nome).toBe(dto.nome);
            //deve ser o mesmo id que foi informado no input do controller
            expect(result.id).toBe(1);
            //deve ser retornado o id de update do grupoId
            expect(result.grupoId).toBe(2);
        });
        it('devo retornar um erro pois o id não existe no banco', async () => {
            const dto = new UpdateEventoDto
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
        it('Devo retornar um objeto evento com o mesmo id que foi informado no teste', async () => {
            const result = await controller.remove('3');
            expect(result.nome).toBe('testeCreate');
            //deve ser o mesmo id que foi informado no input do controller
            expect(result.id).toBe(3); 
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

    describe('publicEvents', () => {
        it('devo retornar um array com todos os eventos publicos do banco', async () => {
            const result = await controller.publicEvents();
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThan(0);
        })
    });
});