import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/auth/auth.controller';
import { UsuariosController } from '../src/usuarios/usuarios.controller';
import { UsuariosModule } from '../src/usuarios/usuarios.module';
import { AuthService } from '../src/auth/auth.service';
import { UsuariosService } from '../src/usuarios/usuarios.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthModule } from '../src/auth/auth.module';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateUsuarioDto } from '../src/usuarios/dto/create-usuario.dto';

describe('atividade integração', () => {
    let controller: AuthController;
    let Service: AuthService;
    let UserController: UsuariosController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [AuthController, UsuariosController],
        providers: [AuthService, UsuariosService, PrismaService],
        imports: [AuthModule, UsuariosModule],
        }).compile();
    
        controller = module.get<AuthController>(AuthController);
        Service = module.get<AuthService>(AuthService);
        UserController = module.get<UsuariosController>(UsuariosController);
    });

    describe('login', () => {
        it('devo retornar um token e as informações do usuário que fez o login', async () => {
            // criando o usuário que vai ser testado
            const dto = new CreateUsuarioDto
            dto.nome = "natalia"
            dto.email = "natalia@gmail.com"
            dto.senha = "natalia123"
            await UserController.create(dto);
            //agora preparo o teste
            let email = 'natalia@gmail.com';
            let senha = 'natalia123';
            const result = await controller.login({email, senha})
            expect(result.data.email).toBe('natalia@gmail.com');
            expect(result.data.nome).toBe('natalia');
            expect(result.Authorization).toBeDefined()
        });

        it('devo retornar um erro por não achar um usuário com o email informado', async () => {
            let email = 'simoesnatalia@gmail.com';
            let senha = 'natalia123';
            try{
                const result = await controller.login({email, senha})
                //não será checada por conta do try
                expect(result.id).toBe(1000);
            } catch(err){
                expect(err).toEqual(new HttpException("invalid_credentials", HttpStatus.UNAUTHORIZED));
            }
        });

        it('devo retornar um erro por a senha não ser a mesma do banco', async () => {
            let email = 'natalia@gmail.com';
            let senha = 'natalia12';
            try{
                const result = await controller.login({email, senha})
                //não será checada por conta do try
                expect(result.id).toBe(1000);
            } catch(err){
                expect(err).toEqual(new HttpException("invalid_credentials", HttpStatus.UNAUTHORIZED));
            }
        });

    });

    describe('validateUser', () => {
        it('devo retornar o usuário do email informado',async () => {
            let data = {
                "email": 'natalia@gmail.com'
            }
            const result = await Service.validateUser(data);
            expect(result).toBeDefined()
            expect(result.nome).toBe('natalia')
        });
        it('devo retornar um erro por não achar o usuário',async () => {
            try {
                let data = {
                    "email": 'natalia@gmail.com'
                }
                const result = await Service.validateUser(data);
            } catch(err){
                expect(err).toEqual(new HttpException("invalid_credentials", HttpStatus.UNAUTHORIZED));
            }
        })
    })
});