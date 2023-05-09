import { Test, TestingModule } from '@nestjs/testing';
import { AtividadesController } from './atividades.controller';
import { AtividadesService } from './atividades.service';
import { atividadesEntity } from './entities/atividade.entity';
import { CreateAtividadeDto } from './dto/create-atividade.dto';

const atividade: atividadesEntity[] =[
  new atividadesEntity({
    id:1,
    nome: 'deu certo',
    horarioInicial: new Date(2023, 4, 4, 16, 30, 0.0),
    horarioFinal: new Date(2023, 4, 5, 16, 30, 0.0),
    descricao: 'deu certo',
    poligonoId: 1
  }),
  new atividadesEntity({
    id:2,
    nome: 'deu certo',
    horarioInicial: new Date(2023, 4, 4, 16, 30, 0.0),
    horarioFinal: new Date(2023, 4, 5, 16, 30, 0.0),
    descricao: 'deu certo',
    poligonoId: 1
}),
new atividadesEntity({
  id:3,
  nome: 'deu certo',
  horarioInicial: new Date(2023, 4, 4, 16, 30, 0.0),
  horarioFinal: new Date(2023, 4, 5, 16, 30, 0.0),
  descricao: 'deu certo',
  poligonoId: 1
})]

describe('AtividadesController', () => {
  let controller: AtividadesController;
  let service: AtividadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtividadesController],
      providers: [
        {
          provide: AtividadesService,
          useValue:{
            create: jest.fn().mockResolvedValue(atividade[0]),
            findByEvento: jest.fn(),
            findOne: jest.fn().mockResolvedValue(atividade[0]),
            findByPoligono: jest.fn().mockResolvedValue(atividade),
            update: jest.fn(),
            remove: jest.fn()
            
            

          },
        },
      ],
    }).compile();

    controller = module.get<AtividadesController>(AtividadesController);
    service = module.get<AtividadesService>(AtividadesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
  
  describe('create', ()=>{
    it('Criar atividade ', async () =>{
      const body: CreateAtividadeDto={
        nome: 'Futsal',
        horarioInicial: new Date(2023, 4, 4, 16, 30, 0.0),
        horarioFinal: new Date(2023, 4, 5, 16, 30, 0.0),
        descricao: 'Futsal masculino semifinal',
        poligonoId: 4 
      }
      
      const result =  await   controller.create(1,body);
      expect(result).toEqual(atividade[0]);
      expect(typeof result).toEqual('object');
      expect(service.create).toHaveBeenCalledTimes(1)
      expect(service.create).toHaveBeenCalledWith(body)
    })
  });
  
  describe ('findOne',()=>{
    it('Encontrar id', async ()=>{
      const result = await controller.findOne('1');
      expect(result).toEqual(atividade[0])
      expect(service.findOne).toHaveBeenCalledWith(1)
    })
  });

  describe ('findByPoligono',()=>{
    it('Encontrar todos os poligonos', async ()=>{
      const result = await controller.findAll(1);
      expect(result).toEqual(atividade)
    })
  });

});