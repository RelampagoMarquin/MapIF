import { Test, TestingModule } from '@nestjs/testing';
import { EventosService } from './eventos.service';
import { PrismaService } from '../prisma/prisma.service';
import { eventosEntity } from './entities/evento.entity';

const eventos: eventosEntity[] = [
  new eventosEntity({
    id: 1,
    nome: 'expotec',
    comeca: new Date(2023, 4, 4, 15, 30, 0, 0),
    fim: new Date(2023, 5, 4, 15, 30, 0, 0),
    grupoId: 1,
    isPublic: true,
    descricao: 'expotec'
  }),
  new eventosEntity({
    id: 2,
    nome: 'secitex',
    comeca: new Date(2023, 6, 4, 15, 30, 0, 0),
    fim: new Date(2023, 7, 4, 15, 30, 0, 0),
    grupoId: 1,
    isPublic: true,
    descricao: 'secitex'
  }),
  new eventosEntity({
    id: 3,
    nome: 'festa',
    comeca: new Date(2023, 8, 4, 15, 30, 0, 0),
    fim: new Date(2023, 9, 4, 15, 30, 0, 0),
    grupoId: 2,
    isPublic: false,
    descricao: 'festa'
  }),
];

const serviceMock = {
  eventos: {
    create: jest.fn().mockReturnValue(eventos[0]),
    findMany: jest.fn().mockResolvedValue(eventos),
    findUnique: jest.fn().mockResolvedValue(eventos[0]),
    update: jest.fn().mockResolvedValue(eventos[0]),
    delete: jest.fn().mockReturnValue(eventos[0]),
  },
}

describe('EventosService', () => {
  let service: EventosService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventosService, {
        provide: PrismaService,
        useValue: serviceMock
      }],
    }).compile();

    service = module.get<EventosService>(EventosService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // neste teste verificamos se o create envia a data de forma correta
  describe('create', () => {
    it('espero retornar o evento criado', async () =>{
      const result = await service.create(eventos[0]);

      expect(result).toBe(eventos[0])
      expect(prisma.eventos.create).toHaveBeenCalledTimes(1);
      expect(prisma.eventos.create).toHaveBeenCalledWith({
        data: eventos[0],
      });
    });
    // o tratamento impede um erro antes de entrar no create, logo não posso testar um create com erro de input
  });

  describe('findAll', () => {
    // neste teste verificamos se o findAll retorna os eventos
    it('espero retornar uma lista de eventos', async () =>{
      const result = await service.findAll();

      expect(result).toBe(eventos)
      expect(prisma.eventos.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.eventos.findMany).toHaveBeenCalledWith(/* nada */);
    });

    // neste teste verificamos se o findAll consegue retornar um array vazio quando o retorno do prisma for
    // um array vaziou
    it('espero retornar uma lista vazia de eventos', async () =>{
      jest.spyOn(prisma.eventos, 'findMany').mockResolvedValue([]);
      const result = await service.findAll();

      expect(result).toStrictEqual([])
      expect(prisma.eventos.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    // neste teste verificamos se o argumento id de eventos é o mesmo da busca
    it('espero retornar uma evento',async () => {
      const result = await service.findOne(1);

      expect(result).toBe(eventos[0])
      expect(prisma.eventos.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.eventos.findUnique).toHaveBeenCalledWith({"where": {"id": 1}});
    });

    // neste teste verificamos quando o findOne não retorna nada
    it('espero retornar nenhum evento', async () => {
      jest.spyOn(prisma.eventos, 'findUnique').mockResolvedValue(null);
      const response = await service.findOne(99);

      expect(response).toBeNull();
      expect(prisma.eventos.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.eventos.findUnique).toHaveBeenCalledWith({
        "where": { "id": 99 },
      });
    });
  });

  describe('update', () => {
    // neste teste verificamos o retorno do update
    it('espero retornar uma evento', async () => {
      const result = await service.update(1, eventos[0]);
  
      expect(result).toBe(eventos[0]);
      expect(prisma.eventos.update).toHaveBeenCalledTimes(1);
      expect(prisma.eventos.update).toHaveBeenCalledWith({
        "where": { "id": 1 },
        "data": eventos[0]
      });
    });

    // neste teste verificamos se o erro do prisma é retornado no update
    it('espero retornar um erro de RecordNotFound', async () => {
      jest.spyOn(prisma.eventos, 'update').mockRejectedValue(new Error('RecordNotFound'))

      try {
        await service.update(42, eventos[0]);
      } catch (error) {
        expect(error).toEqual(new Error('RecordNotFound'));
      }
    });
  });

  describe('remove', () => {
    // neste teste verificamos o retorno do delete e verifica se é o mesmo id retornado
    it(`espero retornar um evento`, async () => {
      const result = await service.remove(1);

      expect(result).toBe(eventos[0]);
      expect(prisma.eventos.delete).toHaveBeenCalledTimes(1);
      expect(prisma.eventos.delete).toHaveBeenCalledWith({
        "where": { "id": 1 }
      });
    });

    // neste teste verificamos se o erro do prisma é retornado no remove
    it('espero retornar um erro de RecordNotFound', async () => {
      jest.spyOn(prisma.eventos, 'delete').mockRejectedValue(new Error('RecordNotFound'))

      try {
        await service.remove(42);
      } catch (error) {
        expect(error).toEqual(new Error('RecordNotFound'));
      }
    });
  });

  describe('publicEvents', () => {
    // neste teste verificamos o retorno do publicEvents
    it('espero retornar um lista de eventos', async () => {
      jest.spyOn(prisma.eventos, 'findMany').mockResolvedValue(eventos)
      const result = await service.publicEvents();

      expect(result).toBe(eventos);
      expect(prisma.eventos.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.eventos.findMany).toHaveBeenCalledWith({
        "where": {
          'isPublic': true,
          'fim': { lte: Date.now().toString() }
        }
      });
    });

    // neste teste verificamos o retorno vazio do publicEvents
    it('espero retornar um lista de eventos', async () => {
      jest.spyOn(prisma.eventos, 'findMany').mockResolvedValue([]);
      const result = await service.publicEvents();

      expect(result).toStrictEqual([])
      expect(prisma.eventos.findMany).toHaveBeenCalledTimes(1);
    });
  })

});
