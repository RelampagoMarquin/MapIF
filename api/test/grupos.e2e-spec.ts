import { Test, TestingModule } from '@nestjs/testing';
import { GruposController } from '../src/grupos/grupos.controller';
import { GruposService } from '../src/grupos/grupos.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { GruposModule } from '../src/grupos/grupos.module';

describe('grupos integração', () => {
    let controller: GruposController;
    let Service: GruposService;
  
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [GruposController],
        providers: [GruposService, PrismaService],
        imports: [GruposModule],
        }).compile();
    
        controller = module.get<GruposController>(GruposController);
        Service = module.get<GruposService>(GruposService);
    });

    it('findAll', async () => {
        const result = await controller.findAll();
        console.log(result)
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    })
});