import { Test, TestingModule } from '@nestjs/testing';
import { AtividadesController } from './atividades.controller';
import { AtividadesService } from './atividades.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AtividadesController', () => {
  let controller: AtividadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtividadesController],
      providers: [AtividadesService, PrismaService],
    }).compile();

    controller = module.get<AtividadesController>(AtividadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
