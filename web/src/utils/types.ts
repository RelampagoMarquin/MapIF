export interface User {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

export interface UserCreate {
  nome: string;
  email: string;
  senha: string;
}

export interface UserLogin {
  email: string;
  senha: string;
}

export interface Drawer {
  icon: string;
  title: string;
  value: string;
  router: string;
}

export interface Local {
  id: number;
  nome: string;
}
export interface Event {
  id: number;
  nome: string;
  comeca: Date;
  fim: Date;
  grupoId: number;
  descricao: string;
  isPublic: boolean;
}

export interface EventCreate {
  nome: string;
  comeca: Date;
  fim: Date;
  grupoId: number | string;
  descricao: string;
  isPublic: boolean;
}

export interface Polygon {
  id: number;
  eventoId: number;
  locais: JSON;
}

export interface PolygonCreate {
  eventoId: number;
  locais: JSON;
}

export interface Activity {
  id: number;
  nome: string;
  horarioInicial: Date;
  horarioFinal: Date;
  descricao: string;
  poligonoId: number;
}

export interface ActivityCreate {
  nome: string;
  horarioInicial: Date;
  horarioFinal: Date;
  descricao: string;
  poligonoId: string | string[] | number;
  isPublic: boolean;
}

export interface Group {
  id: number;
  nome: string;
  usuarioGrupo: UserGroup[];
}

export interface GroupCreate {
  nome: string;
}
export interface UserGroup {
  usuarioId: number;
  grupoId: number;
  isAdmin: boolean;
  usuario: User;
}

export interface UsuarioGrupo {
  usuarioId: number | string;
  grupoId: number;
  isAdmin: boolean;
}
export interface ActivityType {
  id: number;
  nome: string;
  horarioInicial: Date;
  horarioFinal: Date;
  descricao: string;
  poligonoId: number;
}
