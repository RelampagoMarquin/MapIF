import { Test, TestingModule } from '@nestjs/testing';
import { PoligonosController } from './poligonos.controller';
import { PoligonosService } from './poligonos.service';

describe('PoligonosController', () => {
  let controller: PoligonosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoligonosController],
      providers: [PoligonosService],
    }).compile();

    controller = module.get<PoligonosController>(PoligonosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
