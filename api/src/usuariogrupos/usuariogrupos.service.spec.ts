import { Test, TestingModule } from '@nestjs/testing';
import { UsuariogruposService } from './usuariogrupos.service';
import { PrismaService } from '../prisma/prisma.service';
import { usuariogrupoEntity } from './entities/usuariogrupo.entity';

const mockBd: usuariogrupoEntity[] = [
  new usuariogrupoEntity({
    usuarioId: 1,
    grupoId: 1,
    isAdmin: true
  }),
  new usuariogrupoEntity({
    usuarioId: 2,
    grupoId: 1,
    isAdmin: false
  }),
  new usuariogrupoEntity({
    usuarioId: 2,
    grupoId: 2,
    isAdmin: true
  }),
];

const serviceMock = {
  usuarioGrupo: {
    create: jest.fn().mockReturnValue(mockBd[0]),
    findMany: jest.fn().mockResolvedValue(mockBd),
    findUnique: jest.fn().mockResolvedValue(mockBd[0]),
    update: jest.fn().mockResolvedValue(mockBd[0]),
    delete: jest.fn().mockReturnValue(mockBd[0]),
  },
}

describe('UsuariogruposService', () => {
  let service: UsuariogruposService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuariogruposService, {
        provide: PrismaService,
        useValue: serviceMock
      }],
    }).compile();

    service = module.get<UsuariogruposService>(UsuariogruposService);
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
    it('espero retornar o usuarioGrupo criado', async () =>{
      const result = await service.create(mockBd[0]);

      expect(result).toBe(mockBd[0])
      expect(prisma.usuarioGrupo.create).toHaveBeenCalledTimes(1);
      expect(prisma.usuarioGrupo.create).toHaveBeenCalledWith({data: mockBd[0]});
    });
    // o tratamento impede um erro antes de entrar no create, logo não posso testar um create com erro de input
  });

  describe('findAll', () => {
    // neste teste verificamos se o findAll retorna os usuarioGrupo do evento informado
    it('espero retornar uma lista de usuarioGrupo', async () =>{
      const result = await service.findAll();

      expect(result).toBe(mockBd)
      expect(prisma.usuarioGrupo.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.usuarioGrupo.findMany).toHaveBeenCalledWith(/* nada */);
    });

    // neste teste verificamos se o findAll consegue retornar um array vazio quando o retorno do prisma for
    // um array vaziou
    it('espero retornar uma lista vazia de usuarioGrupo', async () =>{
      jest.spyOn(prisma.usuarioGrupo, 'findMany').mockResolvedValue([]);
      const result = await service.findAll();

      expect(result).toStrictEqual([])
      expect(prisma.usuarioGrupo.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    // neste teste verificamos se o argumento id de usuarioId e grupoId são os mesmo da busca
    it('espero retornar uma usuarioGrupo',async () => {
      const result = await service.findOne(1, 1);

      expect(result).toBe(mockBd[0])
      expect(prisma.usuarioGrupo.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.usuarioGrupo.findUnique).toHaveBeenCalledWith(
        {"where":{ "usuarioId_grupoId": {"usuarioId": 1, "grupoId": 1}}});
    });

    // neste teste verificamos quando o findOne não retorna nada
    it('espero retornar nenhum usuarioGrupo', async () => {
      jest.spyOn(prisma.usuarioGrupo, 'findUnique').mockResolvedValue(null);
      const response = await service.findOne(99, 99);

      expect(response).toBeNull();
      expect(prisma.usuarioGrupo.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    // neste teste verificamos o retorno do update
    it('espero retornar uma usuarioGrupo', async () => {
      const result = await service.update(1, 1,  mockBd[0]);
  
      expect(result).toBe(mockBd[0]);
      expect(prisma.usuarioGrupo.update).toHaveBeenCalledTimes(1);
      expect(prisma.usuarioGrupo.update).toHaveBeenCalledWith({
        "where": { "usuarioId_grupoId": {"usuarioId": 1, "grupoId": 1}},
        "data": mockBd[0]
      });
    });

    // neste teste verificamos se o erro do prisma é retornado no update
    it('espero retornar um erro de RecordNotFound', async () => {
      jest.spyOn(prisma.usuarioGrupo, 'update').mockRejectedValue(new Error('RecordNotFound'))

      try {
        await service.update(42, 42, mockBd[0]);
      } catch (error) {
        expect(error).toEqual(new Error('RecordNotFound'));
      }
    });
  });

  describe('remove', () => {
    // neste teste verificamos o retorno do delete e verifica se é o mesmo id retornado
    it(`espero retornar um usuarioGrupo`, async () => {
      const result = await service.remove(1, 1);

      expect(result).toBe(mockBd[0]);
      expect(prisma.usuarioGrupo.delete).toHaveBeenCalledTimes(1);
      expect(prisma.usuarioGrupo.delete).toHaveBeenCalledWith({
        "where": { "usuarioId_grupoId": {"usuarioId": 1, "grupoId": 1}}
      });
    });

    // neste teste verificamos se o erro do prisma é retornado no remove
    it('espero retornar um erro de RecordNotFound', async () => {
      jest.spyOn(prisma.usuarioGrupo, 'delete').mockRejectedValue(new Error('RecordNotFound'))

      try {
        await service.remove(42, 42);
      } catch (error) {
        expect(error).toEqual(new Error('RecordNotFound'));
      }
    });
  });
});
