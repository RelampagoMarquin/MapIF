import { Test, TestingModule } from '@nestjs/testing';
import { AtividadesController } from './atividades.controller';
import { AtividadesService } from './atividades.service';
import { atividadesEntity } from './entities/atividade.entity';
import { CreateAtividadeDto } from './dto/create-atividade.dto';
import { UpdateAtividadeDto } from './dto/update-atividade.dto';


const atividade: atividadesEntity[] =[
  new atividadesEntity({
        id:1,
        nome: 'Xadrez',
        horarioInicial: new Date(2023, 4, 4, 16, 30, 0.0),
        horarioFinal: new Date(2023, 4, 5, 16, 30, 0.0),
        descricao: 'Masculino',
        poligonoId: 1
  }),
  new atividadesEntity({
    id:2,
    nome: 'Futebol',
    horarioInicial: new Date(2023, 4, 4, 16, 30, 0.0),
    horarioFinal: new Date(2023, 4, 5, 16, 30, 0.0),
    descricao: 'Feminino',
    poligonoId: 2
}),
new atividadesEntity({
  id:3,
  nome: 'Ping pong',
  horarioInicial: new Date(2023, 4, 4, 16, 30, 0.0),
  horarioFinal: new Date(2023, 4, 5, 16, 30, 0.0),
  descricao: 'Duplas',
  poligonoId: 1
}),
new atividadesEntity({
  id:4,
  nome: 'Queimada',
  horarioInicial: new Date(2023, 4, 4, 16, 30, 0.0),
  horarioFinal: new Date(2023, 4, 5, 16, 30, 0.0),
  descricao: 'Mista',
  poligonoId: 6
}),
new atividadesEntity({
  id:5,
  nome: 'deu certo',
  horarioInicial: new Date(2023, 4, 4, 16, 30, 0.0),
  horarioFinal: new Date(2023, 4, 5, 16, 30, 0.0),
  descricao: 'deu certo',
  poligonoId: 1
}),
new atividadesEntity({
  id:6,
  nome: 'deu certo',
  horarioInicial: new Date(2023, 4, 4, 16, 30, 0.0),
  horarioFinal: new Date(2023, 4, 5, 16, 30, 0.0),
  descricao: 'deu certo',
  poligonoId: 1
}),
]

const updateAtividadeEntity = new atividadesEntity({
        id:1,
        nome: 'Handebol',
        horarioInicial: new Date(2023, 4, 4, 16, 30, 0.0),
        horarioFinal: new Date(2023, 4, 5, 16, 30, 0.0),
        descricao: 'Masculino',
        poligonoId: 1
})






describe('AtividadesController', () => {
  let controller: AtividadesController;
  let Service: AtividadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtividadesController],
      providers: [
        {
          provide: AtividadesService,
          useValue:{
            create: jest.fn().mockResolvedValue(atividade[0]),
            findByEvento: jest.fn().mockResolvedValue(atividade),
            findOne: jest.fn().mockResolvedValue(atividade[0]),
            findByPoligono: jest.fn().mockResolvedValue(atividade),
            update: jest.fn().mockResolvedValue(updateAtividadeEntity),
            remove: jest.fn().mockResolvedValue(atividade.filter(atividade=>atividade.id=1))
            
            

          },
        },
      ],
    }).compile();

    controller = module.get<AtividadesController>(AtividadesController);
    Service = module.get<AtividadesService>(AtividadesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(Service).toBeDefined();
  });

  describe('create', ()=>{
    it('Criar atividade ', async () =>{
      const body: CreateAtividadeDto={
        nome: 'Futsal',
        isPublic: false,
        horarioInicial: new Date(2023, 4, 4, 16, 30, 0.0),
        horarioFinal: new Date(2023, 4, 5, 16, 30, 0.0),
        descricao: 'Futsal masculino semifinal',
        poligonoId: 4 
      }
      
      const result =  await   controller.create(1,body);
      expect(result).toEqual(atividade[0]);
      //Confirma que o resultado é do tipo o Obeject
      expect(typeof result).toEqual('object');
      //Afirma que o Service.create foi chamado ao menos uma vez
      expect(Service.create).toHaveBeenCalledTimes(1)
      //Afirma que o Service.create foi chamado com o body
      expect(Service.create).toHaveBeenCalledWith(body)
      
    });
    it('Erro no create',()=>{
      const body: CreateAtividadeDto={
        nome: 'Futsal',
        isPublic: false,
        horarioInicial: new Date(2023, 4, 4, 16, 30, 0.0),
        horarioFinal: new Date(2023, 4, 5, 16, 30, 0.0),
        descricao: 'Futsal masculino semifinal',
        poligonoId: 4 
      }
      jest.spyOn(Service, 'create').mockRejectedValueOnce(new Error());
      expect(controller.create(2,body)).rejects.toThrowError();
      
    })

  });

  describe ('findOne',()=>{
    it('Encontrar por id', async ()=>{
      const result = await controller.findOne('1');
      expect(result).toEqual(atividade[0])
      expect(Service.findOne).toHaveBeenCalledWith(1)
    });
    it('Erro do findOne',()=>{
      jest.spyOn(Service, 'findOne').mockRejectedValueOnce(new Error());
      expect(controller.findOne("2")).rejects.toThrowError();
    })
  });

  describe ('findByPoligono',()=>{
    it('Encontrar todos os poligonos', async ()=>{
      const result = await controller.findAll(1);
      expect(result).toEqual(atividade)
      expect(Service.findByPoligono).toHaveBeenCalledWith(1)
      expect(typeof result).toEqual('object');
    })
    it('Erro do findByPoligono',()=>{
      jest.spyOn(Service, 'findByPoligono').mockRejectedValueOnce(new Error());
      expect(controller.findAll(3)).rejects.toThrowError();
    })
  });

  describe ('findByEvento',()=>{
    it('Encontrar todos os eventos', async ()=>{
      const result = await controller.findAllByEvento(3);
      expect(result).toEqual(atividade)
    })
    it('Erro do findByEvento',()=>{
      jest.spyOn(Service, 'findByEvento').mockRejectedValueOnce(new Error());
      expect(controller.findAllByEvento(1)).rejects.toThrowError();
    })
  });

  describe ('update',()=>{
    it('Mudar uma atividade', async ()=>{
      const body: UpdateAtividadeDto={
        nome: 'Handebol',
        horarioInicial: new Date(2023, 4, 4, 16, 30, 0.0),
        horarioFinal: new Date(2023, 4, 5, 16, 30, 0.0),
        descricao: 'Masculino',
        poligonoId: 1
      }
      const result = await controller.update('1',body);
      expect(result).toEqual(updateAtividadeEntity);
      expect(Service.update).toHaveBeenCalledWith(1,body);
      expect(typeof result).toEqual('object');
      })
      it('Erro de update',()=>{
        const body: UpdateAtividadeDto={
          nome: 'Handebol',
          horarioInicial: new Date(2023, 4, 4, 16, 30, 0.0),
          horarioFinal: new Date(2023, 4, 5, 16, 30, 0.0),
          descricao: 'Masculino',
          poligonoId: 1
        }
        jest.spyOn(Service, 'update').mockRejectedValueOnce(new Error());
        expect(controller.update('1',body)).rejects.toThrowError();
      })
  });
  describe ('remove',()=>{
    it('remover uma atividade', async ()=>{
      
      const result = await controller.remove('1');
      expect(result).toEqual(atividade.filter(atividade=>atividade.id=1));
      expect(Service.remove).toHaveBeenCalledWith(1);
      expect(typeof result).toEqual('object');
      })
      it('Erro ao remover',()=>{
        
        jest.spyOn(Service, 'remove').mockRejectedValueOnce(new Error());
        expect(controller.remove('1')).rejects.toThrowError();
      })
  });

});