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
