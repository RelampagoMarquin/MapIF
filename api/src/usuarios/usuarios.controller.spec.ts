import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { usuariosEntity } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
const usuarios: usuariosEntity[] = [
  new usuariosEntity({
    id: 1,
    nome: "Anderson",
    email: 'n.anderson@gmail.com',
    senha: "po45S2543"

  }),
  new usuariosEntity({
    id: 2,
    nome: "Flamigo",
    email: 'flamigo@gmail.com',
    senha: "po455025"

  }),
  new usuariosEntity({
    id: 3,
    nome: "Flamizade",
    email: 'flamizade@gmail.com',
    senha: "Qnjhvui2532"

  }),
]
const updateUsuario = new usuariosEntity({
  id: 4,
  nome: "Flamizade",
  email: 'flamizade@gmail.com',
  senha: "Qnjhvui2532"


})

describe('UsuariosController', () => {
  let controller: UsuariosController;
  let service: UsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [
        {
          provide: UsuariosService,
          useValue: {
            create: jest.fn().mockResolvedValue(usuarios[2]),
            findAll: jest.fn().mockResolvedValue(usuarios),
            findOne: jest.fn().mockResolvedValue(usuarios[0]),
            update: jest.fn().mockResolvedValue(updateUsuario),
            remove: jest.fn().mockResolvedValue(usuarios.filter(usuarios => usuarios.id = 1))



          },
        },
      ]
    }).compile();

    controller = module.get<UsuariosController>(UsuariosController);
    service = module.get<UsuariosService>(UsuariosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('Criar grupo ', async () => {
      const body: CreateUsuarioDto = {
        nome: "Anderson",
        email: 'n.anderson@gmail.com',
        senha: "po45S2543"

      }

      const result = await controller.create(body);
      expect(result).toEqual(usuarios[2]);
      //Confirma que o resultado é do tipo o Obeject
      expect(typeof result).toEqual('object');
      //Afirma que o Service.create foi chamado ao menos uma vez
      expect(service.create).toHaveBeenCalledTimes(1)
      //Afirma que o Service.create foi chamado com o body
      expect(service.create).toHaveBeenCalledWith(body)

    });
    it('Erro no create', () => {
      const body: CreateUsuarioDto = {
        nome: "Anderson",
        email: 'n.anderson@gmail.com',
        senha: "po45S2543"

      }
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      try {
        const result = controller.create(body);
      } catch (error) {
        expect(error).toThrowError();
      }
    })
  });
  describe('findAll', () => {
    it('Encontrar todos os usuarios', async () => {
      const result = await controller.findAll();
      expect(result).toEqual(usuarios)
      expect(service.findAll).toHaveBeenCalledWith()
      expect(typeof result).toEqual('object');
    })
    it('Erro do findAll', () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());
      expect(controller.findAll()).rejects.toThrowError();
    })
  });
  describe('findOne', () => {
    it('Encontrar usuario por id', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(usuarios[0])
      expect(service.findOne).toHaveBeenCalledWith(1)
    });
    it('Erro do findOne', () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());
      expect(controller.findOne("2")).rejects.toThrowError();
    })
  });
  describe('update', () => {
    it('Mudar um usuario', async () => {
      const body: UpdateUsuarioDto = {
        nome: "Anderson",
        email: 'n.anderson@gmail.com',
        senha: "po45S2543"
      }
      const result = await controller.update('1', body);
      expect(result).toEqual(updateUsuario);
      expect(service.update).toHaveBeenCalledWith(1, body);
      expect(typeof result).toEqual('object');
    })
    it('Erro de update', () => {
      const body: UpdateUsuarioDto = {
        nome: "Anderson",
        email: 'n.anderson@gmail.com',
        senha: "po45S2543"
      }
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());
      expect(controller.update('1', body)).rejects.toThrowError();
    })
  });
  describe('remove', () => {
    it('remover um usuario', async () => {

      const result = await controller.remove('1');
      expect(result).toEqual(usuarios.filter(usuarios => usuarios.id = 1));
      expect(service.remove).toHaveBeenCalledWith(1);
      expect(typeof result).toEqual('object');
    })
    it('Erro ao remover', () => {

      jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error());
      expect(controller.remove('1')).rejects.toThrowError();
    })
  });

});
