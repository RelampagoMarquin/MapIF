import { Test, TestingModule } from '@nestjs/testing';
import { UsuariogruposController } from './usuariogrupos.controller';
import { UsuariogruposService } from './usuariogrupos.service';

describe('UsuariogruposController', () => {
  let controller: UsuariogruposController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariogruposController],
      providers: [UsuariogruposService],
    }).compile();

    controller = module.get<UsuariogruposController>(UsuariogruposController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
