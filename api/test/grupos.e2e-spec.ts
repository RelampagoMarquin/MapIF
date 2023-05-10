import { Test, TestingModule } from '@nestjs/testing';
import { GruposController } from '../src/grupos/grupos.controller';
import { GruposService } from '../src/grupos/grupos.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { GruposEntity } from '../src/grupos/entities/grupo.entity';
import { CreateGrupoDto } from '../src/grupos/dto/create-grupo.dto';

describe('GruposController', () => {
    let controller: GruposController;
    let Service: GruposService;
  
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [GruposController],
        providers: [GruposService, PrismaService],
        }).compile();
    
        controller = module.get<GruposController>(GruposController);
        Service = module.get<GruposService>(GruposService);
    });

    it('findAll', async () => {
        const result = await controller.findAll();
        expect(result[0].id).toBe(1);
    })
});