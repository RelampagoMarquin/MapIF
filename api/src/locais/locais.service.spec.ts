import { Test, TestingModule } from '@nestjs/testing';
import { LocaisService } from './locais.service';

describe('LocaisService', () => {
  let service: LocaisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocaisService],
    }).compile();

    service = module.get<LocaisService>(LocaisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
