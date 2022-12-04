import { defineStore } from 'pinia'

export const useUserStore = defineStore('users', {
   state: () => {
    return {
        users: [],
    }
   },
    getters: {},
    actions: {
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
        async createUser(user: object) {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
        },
        async updateUser(user: object) {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/${user.id}`, {
                method: 'PUT',
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