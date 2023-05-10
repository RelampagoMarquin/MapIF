import { Test, TestingModule } from '@nestjs/testing';
import { PoligonosController } from './poligonos.controller';
import { PoligonosService } from './poligonos.service';
import { poligonosEntity } from './entities/poligono.entity';
import { CreatePoligonoDto } from './dto/create-poligono.dto';

const poligonos: poligonosEntity[] = [
  new poligonosEntity({
    id: 1,
    eventoId: 2,
    locais:'IFRN'
    
  }),
  new poligonosEntity({
    id: 2,
    eventoId: 2,
    locais:'UFRN'
    
  }),
  new poligonosEntity({
    id: 3,
    eventoId: 3,
    locais:'UERN'
    
  }),
  ]
  const updatePoligonosEntity = new poligonosEntity({
    eventoId: 3,
    locais:'UERN/NATAL'
  })

describe('PoligonosController', () => {
  let controller: PoligonosController;
  let Service: PoligonosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoligonosController],
      providers: [
        {
          provide: PoligonosService,
          useValue: {
            create: jest.fn().mockResolvedValue(poligonos[2]),
            findByEvento: jest.fn().mockResolvedValue(poligonos),
            findOne: jest.fn().mockResolvedValue(poligonos[0]),
            update: jest.fn().mockResolvedValue(updatePoligonosEntity),
            remove: jest.fn().mockResolvedValue(poligonos.filter(poligonos => poligonos.id = 1))
            


          },
        },
      ],
    }).compile();

    controller = module.get<PoligonosController>(PoligonosController);
    Service = module.get<PoligonosService>(PoligonosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('Criar poligono ', async () => {
      const body: CreatePoligonoDto = {
        eventoId: 2,
        locais:'IFRN'
        }

      const result = await controller.create(2,'IFRN');
      expect(result).toEqual(poligonos[2]);
      //Confirma que o resultado é do tipo o Obeject
      expect(typeof result).toEqual('object');
      //Afirma que o Service.create foi chamado ao menos uma vez
      expect(Service.create).toHaveBeenCalledTimes(1)
      //Afirma que o Service.create foi chamado com o body
      expect(Service.create).toHaveBeenCalledWith(body)

    });
    it('Erro no create', () => {
      const body: CreatePoligonoDto = {
        eventoId: 2,
        locais:'IFRN'
        }
      jest.spyOn(Service, 'create').mockRejectedValueOnce(new Error());
      expect(controller.create(2,body)).rejects.toThrowError();

    })
  });
  describe ('findByEvento',()=>{
    it('Encontrar todos os poligonos', async ()=>{
      const result = await controller.findAll(3);
      expect(result).toEqual(poligonos)
    })
    it('Erro do findByEvento',()=>{
      jest.spyOn(Service, 'findByEvento').mockRejectedValueOnce(new Error());
      expect(controller.findAll(1)).rejects.toThrowError();
    })
  });
  describe('findOne', () => {
    it('Encontrar poligono por id', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(poligonos[0])
      expect(Service.findOne).toHaveBeenCalledWith(1)
    });
    it('Erro do findOne', () => {
      jest.spyOn(Service, 'findOne').mockRejectedValueOnce(new Error());
      expect(controller.findOne("2")).rejects.toThrowError();
    })
  });
  describe('update', () => {
    it('Mudar um poligono', async () => {
      const body: CreatePoligonoDto = {
        eventoId: 3,
        locais:'UERN/NATAL'
        }
      const result = await controller.update('1', body);
      expect(result).toEqual(updatePoligonosEntity);
      expect(Service.update).toHaveBeenCalledWith(1, body);
      expect(typeof result).toEqual('object');
    })
    it('Erro de update', () => {
      const body: CreatePoligonoDto = {
        eventoId: 3,
        locais:'UERN/NATAL'
        }
      jest.spyOn(Service, 'update').mockRejectedValueOnce(new Error());
      expect(controller.update('1', body)).rejects.toThrowError();
    })
  });
  describe('remove', () => {
    it('remover um poligono', async () => {

      const result = await controller.remove('1');
      expect(result).toEqual(poligonos.filter(poligonos=> poligonos.id = 1));
      expect(Service.remove).toHaveBeenCalledWith(1);
      expect(typeof result).toEqual('object');
    })
    it('Erro ao remover', () => {

      jest.spyOn(Service, 'remove').mockRejectedValueOnce(new Error());
      expect(controller.remove('1')).rejects.toThrowError();
    })
   });
});
