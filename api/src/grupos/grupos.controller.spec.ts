import { Test, TestingModule } from '@nestjs/testing';
import { GruposController } from './grupos.controller';
import { GruposService } from './grupos.service';
import { GruposEntity } from './entities/grupo.entity';
import { CreateGrupoDto } from './dto/create-grupo.dto';

const grupos: GruposEntity[] = [
  new GruposEntity({
    id: 1,
    nome: 'Grupo 1',
    
  }),
  new GruposEntity({
    id: 2,
    nome: 'Grupo 2',
    
  }),
  new GruposEntity({
    id: 3,
    nome: 'Grupo 3',
    
  }),
  new GruposEntity({
    id: 4,
    nome: 'Grupo 4',
    
  }),
]
const updateGrupoEntity = new GruposEntity({
  id: 3,
  nome: 'Grupo 3',
  
})

describe('GruposController', () => {
  let controller: GruposController;
  let Service: GruposService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GruposController],
      providers: [
        {
          provide: GruposService,
          useValue: {
            create: jest.fn().mockResolvedValue(grupos[2]),
            findAll: jest.fn().mockResolvedValue(grupos),
            findOne: jest.fn().mockResolvedValue(grupos[0]),
            update: jest.fn().mockResolvedValue(updateGrupoEntity),
            remove: jest.fn().mockResolvedValue(grupos.filter(grupos => grupos.id = 1))
            


          },
        },
      ]
    }).compile();

    controller = module.get<GruposController>(GruposController);
    Service = module.get<GruposService>(GruposService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('Criar grupo ', async () => {
      const body: CreateGrupoDto = {
        nome: 'Grupo 1',
        }

      const result = await controller.create(body);
      expect(result).toEqual(grupos[2]);
      //Confirma que o resultado é do tipo o Obeject
      expect(typeof result).toEqual('object');
      //Afirma que o Service.create foi chamado ao menos uma vez
      expect(Service.create).toHaveBeenCalledTimes(1)
      //Afirma que o Service.create foi chamado com o body
      expect(Service.create).toHaveBeenCalledWith(body)

    });
    it('Erro no create', () => {
      const body: CreateGrupoDto = {
        nome: 'Grupo 1',
        
      }
      jest.spyOn(Service, 'create').mockRejectedValueOnce(new Error());
      expect(controller.create(body)).rejects.toThrowError();

    })
  });
  describe('findAll', () => {
    it('Encontrar todos os grupos', async () => {
      const result = await controller.findAll();
      expect(result).toEqual(grupos)
      expect(Service.findAll).toHaveBeenCalledWith()
      expect(typeof result).toEqual('object');
    })
    it('Erro do findAll', () => {
      jest.spyOn(Service, 'findAll').mockRejectedValueOnce(new Error());
      expect(controller.findAll()).rejects.toThrowError();
    })
  });
  describe('findOne', () => {
    it('Encontrar grupo por id', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(grupos[0])
      expect(Service.findOne).toHaveBeenCalledWith(1)
    });
    it('Erro do findOne', () => {
      jest.spyOn(Service, 'findOne').mockRejectedValueOnce(new Error());
      expect(controller.findOne("2")).rejects.toThrowError();
    })
  });
  describe('update', () => {
    it('Mudar um grupo', async () => {
      const body: CreateGrupoDto = {
        nome: 'Grupo 4',
        }
      const result = await controller.update('1', body);
      expect(result).toEqual(updateGrupoEntity);
      expect(Service.update).toHaveBeenCalledWith(1, body);
      expect(typeof result).toEqual('object');
    })
    it('Erro de update', () => {
      const body: CreateGrupoDto = {
        nome: 'Grupo 4',
        }
      jest.spyOn(Service, 'update').mockRejectedValueOnce(new Error());
      expect(controller.update('1', body)).rejects.toThrowError();
    })
  });
  describe('remove', () => {
    it('remover um grupo', async () => {

      const result = await controller.remove('1');
      expect(result).toEqual(grupos.filter(grupos=> grupos.id = 1));
      expect(Service.remove).toHaveBeenCalledWith(1);
      expect(typeof result).toEqual('object');
    })
    it('Erro ao remover', () => {

      jest.spyOn(Service, 'remove').mockRejectedValueOnce(new Error());
      expect(controller.remove('1')).rejects.toThrowError();
    })
   });
});