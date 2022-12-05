import { defineStore } from 'pinia'
import { User, UserCreate, UserLogin } from '../utils/types'

export const useUserStore = defineStore('users', {
   state: () => {
    return {
        users: [],
    }
   },
    getters: {},
    actions: {
        async login(body: UserLogin){
            const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const data = await response.json()
            return data
        },
        async getUsers() {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios`)
            const users = await response.json()
            this.users = users
        },
        async getOneUser(id: number){
            const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/${id}`)
            const user = await response.json()
            return user
        },
        async createUser(user: UserCreate) {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
        },
        async updateUser(user: User) {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
        },
        async deleteUser(id: number) {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/${id}`, {
                method: 'DELETE',
            })
        }
    }
})