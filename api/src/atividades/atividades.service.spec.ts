import { Test, TestingModule } from '@nestjs/testing';
import { AtividadesService } from './atividades.service';
import { PrismaService } from '../prisma/prisma.service';
import { atividadesEntity } from './entities/atividade.entity';

const mockBd: atividadesEntity[] = [
  new atividadesEntity({
    id: 1, 
    nome: 'xadrez',
    horarioInicial: new Date(2023, 4, 4, 15, 30, 0, 0),
    horarioFinal: new Date(2023, 4, 4, 16, 30, 0, 0),
    descricao: 'xadrez',
    poligonoId: 1
  }),
  new atividadesEntity({
    id: 2, 
    nome: 'damas',
    horarioInicial: new Date(2023, 4, 5, 15, 30, 0, 0),
    horarioFinal: new Date(2023, 4, 5, 16, 30, 0, 0),
    descricao: 'damas',
    poligonoId: 1
  }),
  new atividadesEntity({
    id: 3, 
    nome: 'paciência ',
    horarioInicial: new Date(2023, 4, 6, 15, 30, 0, 0),
    horarioFinal: new Date(2023, 4, 6, 16, 30, 0, 0),
    descricao: 'paciência',
    poligonoId: 2
  })
];

const serviceMock = {
  atividade: {
    create: jest.fn().mockReturnValue(mockBd[0]),
    findMany: jest.fn().mockResolvedValue(mockBd),
    findUnique: jest.fn().mockResolvedValue(mockBd[0]),
    update: jest.fn().mockResolvedValue(mockBd[0]),
    delete: jest.fn().mockReturnValue(mockBd[0]),
  },
}

describe('AtividadesService', () => {
  let service: AtividadesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtividadesService, {
        provide: PrismaService,
        useValue:  serviceMock,
      }]
    }).compile();

    service = module.get<AtividadesService>(AtividadesService);
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
    it('espero retornar a atividade criada', async () =>{
      const result = await service.create(mockBd[0]);

      expect(result).toBe(mockBd[0])
      expect(prisma.atividade.create).toHaveBeenCalledTimes(1);
      expect(prisma.atividade.create).toHaveBeenCalledWith({
        data: mockBd[0],
      });
    });
    // o tratamento impede um erro antes de entrar no create, logo não posso testar um create com erro de input
  });

  describe('findByPoligono', () => {
    // neste teste verificamos se o argumento poligonoId é retornado com o valor enviado pelo metodo findByPoligono
    it('espero retornar uma lista de atividades', async () =>{
      const result = await service.findByPoligono(1);

      expect(result).toBe(mockBd)
      expect(prisma.atividade.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.atividade.findMany).toHaveBeenCalledWith({"where": {"poligonoId": 1,}});
    });

    // neste teste verificamos se o findByPoligono consegue retornar um array vazio quando o retorno do prisma for
    // um array vaziou
    it('espero retornar uma lista vazia de atividade', async () =>{
      jest.spyOn(prisma.atividade, 'findMany').mockResolvedValue([]);
      const result = await service.findByPoligono(1);

      expect(result).toStrictEqual([])
      expect(prisma.atividade.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findByEvent', () => {
    // neste teste verificamos o funcionamento de findByEvent
    it('espero retornar uma lista de atividades', async () =>{
      jest.spyOn(prisma.atividade, 'findMany').mockResolvedValue(mockBd);
      const result = await service.findByEvento(1);

      expect(result).toBe(mockBd)
      expect(prisma.atividade.findMany).toHaveBeenCalledTimes(1);
    });

    // neste teste verificamos se o findByPoligono consegue retornar um array vazio quando o retorno do prisma for
    // um array vazio
    it('espero retornar uma lista vazia de atividade', async () =>{
      jest.spyOn(prisma.atividade, 'findMany').mockResolvedValue([]);
      const result = await service.findByEvento(1);

      expect(result).toStrictEqual([])
      expect(prisma.atividade.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    // neste teste verificamos se o argumento id da atividade é o mesmo da busca
    it('espero retornar uma atividade apenas',async () => {
      const result = await service.findOne(1);

      expect(result).toBe(mockBd[0])
      expect(prisma.atividade.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.atividade.findUnique).toHaveBeenCalledWith({"where": {"id": 1}});
    });

    // neste teste verificamos quando o findOne não retorna nada
    it('espero retornar uma nenhuma atividade', async () => {
      jest.spyOn(prisma.atividade, 'findUnique').mockResolvedValue(null);
      const response = await service.findOne(99);

      expect(response).toBeNull();
      expect(prisma.atividade.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.atividade.findUnique).toHaveBeenCalledWith({
        "where": { "id": 99 },
      });
    });
  });

  describe('update', () => {
    // neste teste verificamos o retorno do update
    it('espero retornar uma tividade', async () => {
      const result = await service.update(1, mockBd[0]);
  
      expect(result).toBe(mockBd[0]);
      expect(prisma.atividade.update).toHaveBeenCalledTimes(1);
      expect(prisma.atividade.update).toHaveBeenCalledWith({
        "where": { "id": 1 },
        "data": mockBd[0]
      });
    });

    // neste teste verificamos se o erro do prisma é retornado no update
    it('espero retornar um erro de RecordNotFound', async () => {
      jest.spyOn(prisma.atividade, 'update').mockRejectedValue(new Error('RecordNotFound'))

      try {
        await service.update(42, mockBd[0]);
      } catch (error) {
        expect(error).toEqual(new Error('RecordNotFound'));
      }
    });
  });

  describe('remove', () => {
    // neste teste verificamos o retorno do delete e verifica se é o mesmo id retornado
    it(`espero retornar uma tividade`, async () => {
      const response = await service.remove(1);

      expect(response).toBe(mockBd[0]);
      expect(prisma.atividade.delete).toHaveBeenCalledTimes(1);
      expect(prisma.atividade.delete).toHaveBeenCalledWith({
        "where": { "id": 1 }
      });
    });

    // neste teste verificamos se o erro do prisma é retornado no remove
    it('espero retornar um erro de RecordNotFound', async () => {
      jest.spyOn(prisma.atividade, 'delete').mockRejectedValue(new Error('RecordNotFound'))

      try {
        await service.remove(42);
      } catch (error) {
        expect(error).toEqual(new Error('RecordNotFound'));
      }
    });
  });
});
