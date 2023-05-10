import { Test, TestingModule } from '@nestjs/testing';
import { UsuariogruposController } from './usuariogrupos.controller';
import { UsuariogruposService } from './usuariogrupos.service';
import { usuariogrupoEntity } from './entities/usuariogrupo.entity';
import { CreateUsuariogrupoDto } from './dto/create-usuariogrupo.dto';

const usuariogrupos: usuariogrupoEntity[] = [
  new usuariogrupoEntity({
    usuarioId: 1,
    grupoId: 1,
    isAdmin:true
    
  }),
  new usuariogrupoEntity({
    usuarioId: 2,
    grupoId: 5,
    isAdmin:true
    
  }),
  new usuariogrupoEntity({
    usuarioId: 3,
    grupoId: 4,
    isAdmin:false
    
  }),
]
const updateUsuarioGrupo = new usuariogrupoEntity({
  usuarioId: 3,
  grupoId: 4,
  isAdmin:true
  
})
describe('UsuariogruposController', () => {
  let controller: UsuariogruposController;
  let Service: UsuariogruposService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariogruposController],
      providers: [
        {
          provide: UsuariogruposService,
          useValue: {
            create: jest.fn().mockResolvedValue(usuariogrupos[2]),
            findAll: jest.fn().mockResolvedValue(usuariogrupos),
            findOne: jest.fn().mockResolvedValue(usuariogrupos[0]),
            update: jest.fn().mockResolvedValue(updateUsuarioGrupo),
            remove: jest.fn().mockResolvedValue(usuariogrupos.filter(usuariogrupos => usuariogrupos.grupoId = 4))
            


          },
        },
      ]
    }).compile();

    controller = module.get<UsuariogruposController>(UsuariogruposController);
    Service = module.get<UsuariogruposService>(UsuariogruposService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('Criar grupo de usuario ', async () => {
      const body: CreateUsuariogrupoDto = {
        usuarioId: 3,
        grupoId: 4,
        isAdmin:false
        }

      const result = await controller.create(body);
      expect(result).toEqual(usuariogrupos[2]);
      //Confirma que o resultado é do tipo o Obeject
      expect(typeof result).toEqual('object');
      //Afirma que o Service.create foi chamado ao menos uma vez
      expect(Service.create).toHaveBeenCalledTimes(1)
      //Afirma que o Service.create foi chamado com o body
      expect(Service.create).toHaveBeenCalledWith(body)

    });
    it('Erro no create', () => {
      const body: CreateUsuariogrupoDto = {
        usuarioId: 3,
        grupoId: 4,
        isAdmin:false
        
      }
      jest.spyOn(Service, 'create').mockRejectedValueOnce(new Error());
      expect(controller.create(body)).rejects.toThrowError();

    })
  });
  describe('findAll', () => {
    it('Encontrar todos os grupos de usuarios', async () => {
      const result = await controller.findAll();
      expect(result).toEqual(usuariogrupos)
      expect(Service.findAll).toHaveBeenCalledWith()
      expect(typeof result).toEqual('object');
    })
    it('Erro do findAll', () => {
      jest.spyOn(Service, 'findAll').mockRejectedValueOnce(new Error());
      expect(controller.findAll()).rejects.toThrowError();
    })
  });
  describe('findOne', () => {
    it('Encontrar grupo de usuario por id', async () => {
      const result = await controller.findOne('1','1');
      expect(result).toEqual(usuariogrupos[0])
      expect(Service.findOne).toHaveBeenCalledWith(1,1)
    });
    it('Erro do findOne', () => {
      jest.spyOn(Service, 'findOne').mockRejectedValueOnce(new Error());
      expect(controller.findOne("2",'1')).rejects.toThrowError();
    })
  });
  describe('update', () => {
    it('Mudar um grupo de usuario', async () => {
      const body: CreateUsuariogrupoDto = {
        usuarioId: 3,
        grupoId: 4,
        isAdmin:false
        }
      const result = await controller.update('1','1', body);
      expect(result).toEqual(updateUsuarioGrupo);
      expect(Service.update).toHaveBeenCalledWith(1,1, body);
      expect(typeof result).toEqual('object');
    })
    it('Erro de update', () => {
      const body: CreateUsuariogrupoDto = {
        usuarioId: 3,
        grupoId: 4,
        isAdmin:false
        }
      jest.spyOn(Service, 'update').mockRejectedValueOnce(new Error());
      expect(controller.update('1','1', body)).rejects.toThrowError();
    })
  });
  describe('remove', () => {
    it('remover um grupo de usuario', async () => {

      const result = await controller.remove('1','1');
      expect(result).toEqual(usuariogrupos.filter(usuariogrupos=> usuariogrupos.grupoId = 4));
      expect(Service.remove).toHaveBeenCalledWith(1,1);
      expect(typeof result).toEqual('object');
    })
    it('Erro ao remover', () => {

      jest.spyOn(Service, 'remove').mockRejectedValueOnce(new Error());
      expect(controller.remove('1','1')).rejects.toThrowError();
    })
   });
});
