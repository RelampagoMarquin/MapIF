import { defineStore } from 'pinia';
import { User, UserCreate, UserLogin } from '../utils/types';
import axios from "axios";

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
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/usuarios`);
            this.users = response.data;
        },
        async getOneUser(id: number){
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/usuarios/${id}`);
            const user = response.data;
            return user;
        },
        async createUser(user: UserCreate) {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/usuarios`, {
                user
            });
        },
        async updateUser(user: User) {
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/usuario/${user.id}`, {
                user
            });

            return this.getOneUser(user.id);
        },
        async deleteUser(id: number) {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/usuario/${id}`);
        }
    }
})