import { Test, TestingModule } from '@nestjs/testing';
import { PoligonosService } from './poligonos.service';
import { PrismaService } from '../prisma/prisma.service';
import { poligonosEntity } from './entities/poligono.entity';

const mockDb: poligonosEntity[] = [
  new poligonosEntity({
    id: 1,
    eventoId: 1,
    locais: 'local1'
  }),
  new poligonosEntity({
    id: 2,
    eventoId: 1,
    locais: 'local2'
  }),
  new poligonosEntity({
    id: 3,
    eventoId: 1,
    locais: 'local3'
  }),
];

const serviceMock = {
  poligonos: {
    create: jest.fn().mockReturnValue(mockDb[0]),
    findMany: jest.fn().mockResolvedValue(mockDb),
    findUnique: jest.fn().mockResolvedValue(mockDb[0]),
    update: jest.fn().mockResolvedValue(mockDb[0]),
    delete: jest.fn().mockReturnValue(mockDb[0]),
  },
}

describe('PoligonosService', () => {
  let service: PoligonosService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoligonosService, {
        provide: PrismaService,
        useValue: serviceMock
      }],
    }).compile();

    service = module.get<PoligonosService>(PoligonosService);
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
    it('espero retornar o poligono criado', async () =>{
      const result = await service.create(mockDb[0]);

      expect(result).toBe(mockDb[0])
      expect(prisma.poligonos.create).toHaveBeenCalledTimes(1);
    });
    // o tratamento impede um erro antes de entrar no create, logo não posso testar um create com erro de input
  });

  describe('findByEvento', () => {
    // neste teste verificamos se o findAll retorna os poligonos do evento informado
    it('espero retornar uma lista de poligonos', async () =>{
      const result = await service.findByEvento(1);

      expect(result).toBe(mockDb)
      expect(prisma.poligonos.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.poligonos.findMany).toHaveBeenCalledWith({"where": {"eventoId": 1}});
    });

    // neste teste verificamos se o findAll consegue retornar um array vazio quando o retorno do prisma for
    // um array vaziou
    it('espero retornar uma lista vazia de poligonos', async () =>{
      jest.spyOn(prisma.poligonos, 'findMany').mockResolvedValue([]);
      const result = await service.findByEvento(1);

      expect(result).toStrictEqual([])
      expect(prisma.poligonos.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    // neste teste verificamos se o argumento id de poligonos é o mesmo da busca
    it('espero retornar uma poligono',async () => {
      const result = await service.findOne(1);

      expect(result).toBe(mockDb[0])
      expect(prisma.poligonos.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.poligonos.findUnique).toHaveBeenCalledWith({"where": {"id": 1}});
    });

    // neste teste verificamos quando o findOne não retorna nada
    it('espero retornar nenhum poligono', async () => {
      jest.spyOn(prisma.poligonos, 'findUnique').mockResolvedValue(null);
      const response = await service.findOne(99);

      expect(response).toBeNull();
      expect(prisma.poligonos.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    // neste teste verificamos o retorno do update
    it('espero retornar uma poligono', async () => {
      const result = await service.update(1, mockDb[0]);
  
      expect(result).toBe(mockDb[0]);
      expect(prisma.poligonos.update).toHaveBeenCalledTimes(1);
      expect(prisma.poligonos.update).toHaveBeenCalledWith({
        "where": { "id": 1 },
        "data": mockDb[0]
      });
    });

    // neste teste verificamos se o erro do prisma é retornado no update
    it('espero retornar um erro de RecordNotFound', async () => {
      jest.spyOn(prisma.poligonos, 'update').mockRejectedValue(new Error('RecordNotFound'))

      try {
        await service.update(42, mockDb[0]);
      } catch (error) {
        expect(error).toEqual(new Error('RecordNotFound'));
      }
    });
  });

  describe('remove', () => {
    // neste teste verificamos o retorno do delete e verifica se é o mesmo id retornado
    it(`espero retornar um poligono`, async () => {
      const result = await service.remove(1);

      expect(result).toBe(mockDb[0]);
      expect(prisma.poligonos.delete).toHaveBeenCalledTimes(1);
      expect(prisma.poligonos.delete).toHaveBeenCalledWith({
        "where": { "id": 1 }
      });
    });

    // neste teste verificamos se o erro do prisma é retornado no remove
    it('espero retornar um erro de RecordNotFound', async () => {
      jest.spyOn(prisma.poligonos, 'delete').mockRejectedValue(new Error('RecordNotFound'))

      try {
        await service.remove(42);
      } catch (error) {
        expect(error).toEqual(new Error('RecordNotFound'));
      }
    });
  });
});
