import { Test, TestingModule } from '@nestjs/testing';
import { GruposService } from './grupos.service';
import { PrismaService } from '../prisma/prisma.service';
import { GruposEntity } from './entities/grupo.entity';

const mockDb: GruposEntity[] = [
  new GruposEntity({
    id: 1,
    nome: 'grupo1'
  }),
  new GruposEntity({
    id: 2,
    nome: 'grupo2'
  }),
  new GruposEntity({
    id: 3,
    nome: 'grupo3',
  }),
];

const serviceMock = {
  grupos: {
    create: jest.fn().mockReturnValue(mockDb[0]),
    findMany: jest.fn().mockResolvedValue(mockDb),
    findUnique: jest.fn().mockResolvedValue(mockDb[0]),
    update: jest.fn().mockResolvedValue(mockDb[0]),
    delete: jest.fn().mockReturnValue(mockDb[0]),
  },
}

describe('GruposService', () => {
  let service: GruposService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GruposService, {
        provide: PrismaService,
        useValue: serviceMock
      }],
    }).compile();

    service = module.get<GruposService>(GruposService);
    prisma = module.get<PrismaService>(PrismaService);
  });

    afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    // neste teste verificamos se o create envia a data de forma correta
    it('espero retornar o grupo criado', async () =>{
      const result = await service.create(mockDb[0]);

      expect(result).toBe(mockDb[0])
      expect(prisma.grupos.create).toHaveBeenCalledTimes(1);
      expect(prisma.grupos.create).toHaveBeenCalledWith({
        data: mockDb[0],
      });
    });
    // o tratamento impede um erro antes de entrar no create, logo não posso testar um create com erro de input
  });

  describe('findAll', () => {
    // neste teste verificamos se o findAll retorna os grupos
    it('espero retornar uma lista de grupos', async () =>{
      const result = await service.findAll();

      expect(result).toBe(mockDb)
      expect(prisma.grupos.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.grupos.findMany).toHaveBeenCalledWith(/* nada */);
    });

    // neste teste verificamos se o findAll consegue retornar um array vazio quando o retorno do prisma for
    // um array vaziou
    it('espero retornar uma lista vazia de grupos', async () =>{
      jest.spyOn(prisma.grupos, 'findMany').mockResolvedValue([]);
      const result = await service.findAll();

      expect(result).toStrictEqual([])
      expect(prisma.grupos.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    // neste teste verificamos se o argumento id de grupos é o mesmo da busca
    it('espero retornar uma grupo',async () => {
      const result = await service.findOne(1);

      expect(result).toBe(mockDb[0])
      expect(prisma.grupos.findUnique).toHaveBeenCalledTimes(1);
    });

    // neste teste verificamos quando o findOne não retorna nada
    it('espero retornar nenhum grupo', async () => {
      jest.spyOn(prisma.grupos, 'findUnique').mockResolvedValue(null);
      const response = await service.findOne(99);

      expect(response).toBeNull();
      expect(prisma.grupos.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    // neste teste verificamos o retorno do update
    it('espero retornar uma grupo', async () => {
      const result = await service.update(1, mockDb[0]);
  
      expect(result).toBe(mockDb[0]);
      expect(prisma.grupos.update).toHaveBeenCalledTimes(1);
      expect(prisma.grupos.update).toHaveBeenCalledWith({
        "where": { "id": 1 },
        "data": mockDb[0]
      });
    });

    // neste teste verificamos se o erro do prisma é retornado no update
    it('espero retornar um erro de RecordNotFound', async () => {
      jest.spyOn(prisma.grupos, 'update').mockRejectedValue(new Error('RecordNotFound'))

      try {
        await service.update(42, mockDb[0]);
      } catch (error) {
        expect(error).toEqual(new Error('RecordNotFound'));
      }
    });
  });

  describe('remove', () => {
    // neste teste verificamos o retorno do delete e verifica se é o mesmo id retornado
    it(`espero retornar um grupo`, async () => {
      const result = await service.remove(1);

      expect(result).toBe(mockDb[0]);
      expect(prisma.grupos.delete).toHaveBeenCalledTimes(1);
      expect(prisma.grupos.delete).toHaveBeenCalledWith({
        "where": { "id": 1 }
      });
    });

    // neste teste verificamos se o erro do prisma é retornado no remove
    it('espero retornar um erro de RecordNotFound', async () => {
      jest.spyOn(prisma.grupos, 'delete').mockRejectedValue(new Error('RecordNotFound'))

      try {
        await service.remove(42);
      } catch (error) {
        expect(error).toEqual(new Error('RecordNotFound'));
      }
    });
  });
});
