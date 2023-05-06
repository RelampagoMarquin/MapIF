import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './usuarios.service';
import { PrismaService } from '../prisma/prisma.service';
import { usuariosEntity } from './entities/usuario.entity'; 
import { LoginUsuarioDto } from './dto/login-user.dto';
import { HttpException, HttpStatus} from '@nestjs/common';

const mockDb: usuariosEntity[] = [
  new usuariosEntity({
    id: 1,
    nome: 'rick',
    email: 'rick',
    senha: 'rick',
  }),
  new usuariosEntity({
    id: 1,
    nome: 'rick',
    email: 'rick',
    senha: 'rick',
  }),
  new usuariosEntity({
    id: 2,
    nome: 'maria',
    email: 'maria',
    senha: 'maria',
  }),
];

interface FormatLogin extends Partial<usuariosEntity> {
  email: string;
}

const serviceMock = {
  usuarios: {
    create: jest.fn().mockReturnValue(mockDb[0]),
    findMany: jest.fn().mockResolvedValue(mockDb),
    findUnique: jest.fn().mockResolvedValue(mockDb[0]),
    update: jest.fn().mockResolvedValue(mockDb[0]),
    delete: jest.fn().mockReturnValue(mockDb[0]),
    findFirst: jest.fn().mockResolvedValue(mockDb[0])
  },
}

describe('UsuariosService', () => {
  let service: UsuariosService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuariosService, {
        provide: PrismaService,
        useValue: serviceMock
      }],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
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
    it('espero retornar o usuario criado', async () =>{
      const result = await service.create(mockDb[0]);

      expect(result).toBe(mockDb[0])
      expect(prisma.usuarios.create).toHaveBeenCalledTimes(1);
      expect(prisma.usuarios.create).toHaveBeenCalledWith({data: mockDb[0]});
    });
    // o tratamento impede um erro antes de entrar no create, logo não posso testar um create com erro de input
  });

  describe('findAll', () => {
    // neste teste verificamos se o findAll retorna os usuarios do evento informado
    it('espero retornar uma lista de usuarios', async () =>{
      const result = await service.findAll();

      expect(result).toBe(mockDb)
      expect(prisma.usuarios.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.usuarios.findMany).toHaveBeenCalledWith(/* nada */);
    });

    // neste teste verificamos se o findAll consegue retornar um array vazio quando o retorno do prisma for
    // um array vaziou
    it('espero retornar uma lista vazia de usuarios', async () =>{
      jest.spyOn(prisma.usuarios, 'findMany').mockResolvedValue([]);
      const result = await service.findAll();

      expect(result).toStrictEqual([])
      expect(prisma.usuarios.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    // neste teste verificamos se o argumento id de usuarios é o mesmo da busca
    it('espero retornar uma usuario',async () => {
      const result = await service.findOne(1);

      expect(result).toBe(mockDb[0])
      expect(prisma.usuarios.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.usuarios.findUnique).toHaveBeenCalledWith({"where": {"id": 1}});
    });

    // neste teste verificamos quando o findOne não retorna nada
    it('espero retornar nenhum usuario', async () => {
      jest.spyOn(prisma.usuarios, 'findUnique').mockResolvedValue(null);
      const response = await service.findOne(99);

      expect(response).toBeNull();
      expect(prisma.usuarios.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    // neste teste verificamos o retorno do update
    it('espero retornar uma usuario', async () => {
      const result = await service.update(1, mockDb[0]);
  
      expect(result).toBe(mockDb[0]);
      expect(prisma.usuarios.update).toHaveBeenCalledTimes(1);
      expect(prisma.usuarios.update).toHaveBeenCalledWith({
        "where": { "id": 1 },
        "data": mockDb[0]
      });
    });

    // neste teste verificamos se o erro do prisma é retornado no update
    it('espero retornar um erro de RecordNotFound', async () => {
      jest.spyOn(prisma.usuarios, 'update').mockRejectedValue(new Error('RecordNotFound'))

      try {
        await service.update(42, mockDb[0]);
      } catch (error) {
        expect(error).toEqual(new Error('RecordNotFound'));
      }
    });
  });

  describe('remove', () => {
    // neste teste verificamos o retorno do delete e verifica se é o mesmo id retornado
    it(`espero retornar um usuario`, async () => {
      const result = await service.remove(1);

      expect(result).toBe(mockDb[0]);
      expect(prisma.usuarios.delete).toHaveBeenCalledTimes(1);
      expect(prisma.usuarios.delete).toHaveBeenCalledWith({
        "where": { "id": 1 }
      });
    });

    // neste teste verificamos se o erro do prisma é retornado no remove
    it('espero retornar um erro de RecordNotFound', async () => {
      jest.spyOn(prisma.usuarios, 'delete').mockRejectedValue(new Error('RecordNotFound'))

      try {
        await service.remove(42);
      } catch (error) {
        expect(error).toEqual(new Error('RecordNotFound'));
      }
    });
  });

  describe('findByLogin', () => {
    // por conta das caracteristicas do teste unitario o findByLogin sempre retornara uma execeção
    //teste do erro de senhas diferentes (neste teste as senhas vão dar erro porque uma vai ser encripitada e a outra não)
    let login: LoginUsuarioDto = {
      email: mockDb[0].email,
      senha: mockDb[0].senha,
    }
    it('espero retornar um erro UNAUTHORIZED',async () => {
      try {
        await service.findByLogin(login);
      } catch (error) {
        expect(error).toEqual(new HttpException("invalid_credentials",
        HttpStatus.UNAUTHORIZED))
      }
    });

    // aqui eu testo outro lançamento de erro quando o usuario não é achado
    it('espero retornar um erro UNAUTHORIZED de novo',async () => {
      jest.spyOn(prisma.usuarios, 'findFirst').mockResolvedValue(null)

      try {
        await service.findByLogin(login);
      } catch (error) {
        expect(error).toEqual(new HttpException("invalid_credentials",
        HttpStatus.UNAUTHORIZED))
      }
    });
  });

  describe('findByPayload', () => {
    // no teste do findByPayload acontece uma busca parecida com o findOne usando o where de email
    it('espero retornar um usuario', async () => {
      jest.spyOn(prisma.usuarios, 'findFirst').mockResolvedValue(mockDb[0])
      const result = await service.findByPayload(mockDb[0].email);

      expect(result).toBe(mockDb[0])
      expect(prisma.usuarios.findFirst).toHaveBeenCalledTimes(1);
    });
  });
});
