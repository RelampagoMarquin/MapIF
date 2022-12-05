export interface User {
    id: number
    nome: string
    email: string
    senha: string
}

export interface UserCreate {
    nome: string
    email: string
    senha: string
}

export interface UserLogin {
    email: string
    senha: string
}