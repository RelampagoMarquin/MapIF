export interface User {
    id: number
    name: string
    email: string
    password: string
}

export interface UserCreate {
    name: string
    email: string
    password: string
}

export interface UserLogin {
    email: string
    password: string
}