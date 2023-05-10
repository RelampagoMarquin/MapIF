import { Test, TestingModule } from '@nestjs/testing';
import { EventosController } from './eventos.controller';
import { EventosService } from './eventos.service';
import { eventosEntity } from './entities/evento.entity';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
const eventos: eventosEntity[] = [
  new eventosEntity({
    id: 1,
    nome: 'Exponovos',
    comeca: new Date(2021, 10, 5, 16, 15, 15.30),
    fim: new Date(2021, 10, 15, 16, 15, 19.30),
    grupoId: 1,
    isPublic: true,
    descricao: 'Exposição de animais '
  }),
  new eventosEntity({
    id: 2,
    nome: 'Exponovos 2022',
    comeca: new Date(2022, 10, 5, 16, 15, 15.30),
    fim: new Date(2022, 10, 15, 16, 15, 19.30),
    grupoId: 2,
    isPublic: true,
    descricao: 'Exposição de animais '
  }),
  new eventosEntity({
    id: 3,
    nome: 'Exponovos 2023',
    comeca: new Date(2023, 10, 5, 16, 15, 15.30),
    fim: new Date(2023, 10, 15, 16, 15, 19.30),
    grupoId: 3,
    isPublic: true,
    descricao: 'Exposição de animais '
  }),

]
const updateventoEntity = new eventosEntity({
  id: 3,
  nome: 'Exponovos 2023',
  comeca: new Date(2023, 10, 5, 16, 15, 15.30),
  fim: new Date(2023, 10, 15, 16, 15, 19.30),
  grupoId: 3,
  isPublic: true,
  descricao: 'Exposição de animais e produtos'
})


describe('EventosController', () => {
  let controller: EventosController;
  let Service: EventosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventosController],
      providers: [
        {
          provide: EventosService,
          useValue: {
            create: jest.fn().mockResolvedValue(eventos[1]),
            findAll: jest.fn().mockResolvedValue(eventos),
            findOne: jest.fn().mockResolvedValue(eventos[0]),
            update: jest.fn().mockResolvedValue(updateventoEntity),
            remove: jest.fn().mockResolvedValue(eventos.filter(eventos => eventos.id = 1)),
            publicEvents: jest.fn().mockResolvedValue(eventos.filter(eventos => eventos.isPublic = true))


          },
        },
      ],
    }).compile();

    controller = module.get<EventosController>(EventosController);
    Service = module.get<EventosService>(EventosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('Criar atividade ', async () => {
      const body: CreateEventoDto = {
        nome: 'Exponovos',
        comeca: new Date(2021, 10, 5, 16, 15, 15.30),
        fim: new Date(2021, 10, 15, 16, 15, 19.30),
        grupoId: 1,
        isPublic: true,
        descricao: 'Exposição de animais '
      }

      const result = await controller.create(body);
      expect(result).toEqual(eventos[1]);
      //Confirma que o resultado é do tipo o Obeject
      expect(typeof result).toEqual('object');
      //Afirma que o Service.create foi chamado ao menos uma vez
      expect(Service.create).toHaveBeenCalledTimes(1)
      //Afirma que o Service.create foi chamado com o body
      expect(Service.create).toHaveBeenCalledWith(body)

    });
    it('Erro no create', () => {
      const body: CreateEventoDto = {
        nome: 'Exponovos',
        comeca: new Date(2021, 10, 5, 16, 15, 15.30),
        fim: new Date(2021, 10, 15, 16, 15, 19.30),
        grupoId: 1,
        isPublic: true,
        descricao: 'Exposição de animais '
      }
      jest.spyOn(Service, 'create').mockRejectedValueOnce(new Error());
      expect(controller.create(body)).rejects.toThrowError();

    })
  });
  describe('findAll', () => {
    it('Encontrar todos os eventos', async () => {
      const result = await controller.findAll();
      expect(result).toEqual(eventos)
      expect(Service.findAll).toHaveBeenCalledWith()
      expect(typeof result).toEqual('object');
    })
    it('Erro do findAll', () => {
      jest.spyOn(Service, 'findAll').mockRejectedValueOnce(new Error());
      expect(controller.findAll()).rejects.toThrowError();
    })
  });
  describe('findOne', () => {
    it('Encontrar por id', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(eventos[0])
      expect(Service.findOne).toHaveBeenCalledWith(1)
    });
    it('Erro do findOne', () => {
      jest.spyOn(Service, 'findOne').mockRejectedValueOnce(new Error());
      expect(controller.findOne("2")).rejects.toThrowError();
    })
  });
  describe('update', () => {
    it('Mudar um evento', async () => {
      const body: UpdateEventoDto = {

        nome: 'Exponovos 2023',
        comeca: new Date(2023, 10, 5, 16, 15, 15.30),
        fim: new Date(2023, 10, 15, 16, 15, 19.30),
        grupoId: 3,
        isPublic: true,
        descricao: 'Exposição de animais e produtos '
      }
      const result = await controller.update('1', body);
      expect(result).toEqual(updateventoEntity);
      expect(Service.update).toHaveBeenCalledWith(1, body);
      expect(typeof result).toEqual('object');
    })
    it('Erro de update', () => {
      const body: UpdateEventoDto = {
        nome: 'Exponovos 2023',
        comeca: new Date(2023, 10, 5, 16, 15, 15.30),
        fim: new Date(2023, 10, 15, 16, 15, 19.30),
        grupoId: 3,
        isPublic: true,
        descricao: 'Exposição de animais e produtos '
      }
      jest.spyOn(Service, 'update').mockRejectedValueOnce(new Error());
      expect(controller.update('1', body)).rejects.toThrowError();
    })
  });
  describe('remove', () => {
    it('remover um evento', async () => {

      const result = await controller.remove('1');
      expect(result).toEqual(eventos.filter(eventos => eventos.id = 1));
      expect(Service.remove).toHaveBeenCalledWith(1);
      expect(typeof result).toEqual('object');
    })
    it('Erro ao remover', () => {

      jest.spyOn(Service, 'remove').mockRejectedValueOnce(new Error());
      expect(controller.remove('1')).rejects.toThrowError();
    })
  });
  describe('publicEvents', () => {
    it('Encontrar todos os eventos publicos', async () => {
      const result = await controller.publicEvents();
      expect(result).toEqual(eventos.filter(eventos => eventos.isPublic = true))
      expect(Service.publicEvents).toHaveBeenCalledWith()
      expect(typeof result).toEqual('object');
    })
    it('Erro do findAll', () => {
      jest.spyOn(Service, 'publicEvents').mockRejectedValueOnce(new Error());
      expect(controller.publicEvents()).rejects.toThrowError();
    })
  });
});