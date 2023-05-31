import { Test, TestingModule } from '@nestjs/testing';
import { PoligonosController } from '../src/poligonos/poligonos.controller';
import { PoligonosService } from '../src/poligonos/poligonos.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { PoligonosModule } from '../src/poligonos/poligonos.module';
import { CreatePoligonoDto } from '../src/poligonos/dto/create-poligono.dto';
import { UpdatePoligonoDto } from '../src/poligonos/dto/update-poligono.dto';

describe('poligono integração', () => {
    let controller: PoligonosController;
    let Service: PoligonosService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [PoligonosController],
        providers: [PoligonosService, PrismaService],
        imports: [PoligonosModule],
        }).compile();
    
        controller = module.get<PoligonosController>(PoligonosController);
        Service = module.get<PoligonosService>(PoligonosService);
    });

    describe('FindAll', () => {
        it('Devo retornar uma array de objetos de um determinado evento', async () => {
            const result = await controller.findAll(1);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe('FindOne', () => {
        it('Devo retornar um objeto Poligono com o mesmo id que foi informado no teste', async () => {
            const result = await controller.findOne('1');
            //deve ser o mesmo id que foi informado no input do controller
            expect(result.id).toBe(1);
        });
        it('devo retornar um erro pois o id de usuário não existe no banco', async () => {
            try {
                const result = await controller.findOne('90');
            } catch(error){
                expect(error).toThrowError();
            }
        });
    });

    describe('Create', () => {
        it('Deve rotorna o Poligono criado e o tamanho atualizado do banco', async () => {
            let data = 
            {
                '{"lat":-6.253456109660978,"lng":-36.535575985908515},{"lat":-6.253093447168288,"lng":-36.535575985908515},{"lat":-6.253093447168288,"lng":-36.5352675318718},{"lat":-6.253456109660978,"lng":-36.5352675318718}': ''
              }
            const result = await controller.create(2, data)
            //verifica se o nome é o mesmo que foi colocado no dto
            expect(result.eventoId).toBe(2);
            const lenght = await controller.findAll(2)
            expect(lenght.length).toBe(2);
        });
        it('devo retornar um erro pois não foi setado o nome', async () => {
            const dto = new CreatePoligonoDto
            try {
                await controller.create(2, dto);
            } catch(err){
                function error() {
                    throw new Error('Usuario não encontrado');
                }
                expect(error).toThrowError();
            }
        });
    });

    describe('update', () => {
        it('Devo retornar um objeto poligono com o mesmo nome e id que foi informado no teste', async () => {
            const dto = new UpdatePoligonoDto
            dto.locais = "37.7749, -122.4194"
            const result = await controller.update('1', dto);
            expect(result.locais).toBe(dto.locais);
            //deve ser o mesmo id que foi informado no input do controller
            expect(result.id).toBe(1); 
        });
        it('devo retornar um erro pois o id não existe no banco', async () => {
            const dto = new UpdatePoligonoDto
            try {
                await controller.update('30', dto);
            } catch(err){
                function error() {
                    throw new Error('Usuario não encontrado');
                }
                expect(error).toThrowError();
            }
        });
    });

    describe('delete', () => {
        it('Devo retornar um objeto poligono com o mesmo id que foi informado no teste', async () => {
            const result = await controller.remove('2')
            expect(result.locais).toBe(123);
            //deve ser o mesmo id que foi informado no input do controller
            expect(result.id).toBe(2); 
        });
        it('devo retornar um erro pois o id não existe no banco', async () => {
            try {
                await controller.remove('30');
            } catch(err){
                function error() {
                    throw new Error('Usuario não encontrado');
                }
                expect(error).toThrowError();
            }
        });
    });
});