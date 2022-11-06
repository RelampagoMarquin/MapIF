import { Test, TestingModule } from '@nestjs/testing';
import { PoligonosService } from './poligonos.service';

describe('PoligonosService', () => {
  let service: PoligonosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoligonosService],
    }).compile();

    service = module.get<PoligonosService>(PoligonosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
