import { Test, TestingModule } from '@nestjs/testing';
import { UsuariogruposService } from './usuariogrupos.service';

describe('UsuariogruposService', () => {
  let service: UsuariogruposService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuariogruposService],
    }).compile();

    service = module.get<UsuariogruposService>(UsuariogruposService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
