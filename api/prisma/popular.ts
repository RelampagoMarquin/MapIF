export const grupos = `INSERT INTO grupos (id, nome) VALUES (1, 'teste1'), (2, 'teste2'), (3, 'teste3');`;
export const usuarios = `INSERT INTO usuarios (id, nome, email, senha) VALUES 
        (1, 'valmir', 'valmir@gmail.com', 'valmir123'), 
        (2, 'marcos', 'marcos@gmail.com', 'marcos123'), 
        (3, 'andré', 'andre@gmail.com', 'andre123');`;
export const eventos = `INSERT INTO eventos (id, nome, comeca, fim, grupoId, isPublic, descricao) VALUES 
        (1, 'semana do esporte', now(), date_add(now(), interval 7 day), 1, true, 'evento esportivo de esportes'), 
        (2, 'semana de amostras cientificas', now(), date_add(now(), interval 7 day), 2, false, 'evento cientifica');`;
export const usuarioGrupos = `INSERT INTO usuariogrupo (usuarioId, grupoId, isAdmin) VALUES 
        (1, 1, true), (2, 1, false), (3, 2, true);`;
export const poligonos = `INSERT INTO poligonos (id, eventoId, locais) VALUES (1, 1, '123'), (2, 1, '123'), (3, 2, '123')`;
export const atividades = `INSERT INTO atividade (id, nome, horarioInicial, horarioFinal, descricao, poligonoId) VALUES 
        (1, 'futsal', now(), date_add(now(), interval 7 day), '4 partidas ganha mais pontos', 1), 
        (2, 'sinuca', now(), date_add(now(), interval 7 day), 'mata mata', 2), 
        (3, 'mapif', now(), date_add(now(), interval 7 day), 'melhor projeto', 3), 
        (4, 'vôlei', now(), date_add(now(), interval 7 day), 'tipo anime', 1)`;