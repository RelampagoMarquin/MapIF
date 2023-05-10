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
    
    describe('FindAll', () => {
        it('Devo retornar uma array de objetos', async () => {
            const result = await controller.findAll();
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe('FindOne', () => {
        it('Devo retornar um objeto grupo com o mesmo id que foi informado no teste', async () => {
            const result = await controller.findOne('2');
            expect(result.nome).toBe('teste2');
            //deve ser o mesmo id que foi informado no input do controller
            expect(result.id).toBe(2); 
        })
        it('devo retornar um erro pois o id não existe no banco', async () => {
            try {
                const result = await controller.findOne('90');
            } catch( error){
                expect(error).toThrowError();
            }
        })
    })
});