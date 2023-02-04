import { defineStore } from 'pinia';
import { User, UserCreate, UserLogin } from '../utils/types';
import axios from "axios";
import router from "../router/index"

export const useUserStore = defineStore('users', {
   state: () => {
    return {
        users: [],
        token: localStorage.getItem('token')
    }
   },
    getters: {},
    actions: {
        async getUsers() {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/usuarios`, 
            {headers: {
                'Authorization': `Bearer ${this.token}`
            }}).catch(function (error) {
                const errorCode = error.response.data.statusCode;
                if (errorCode == 401){
                    router.push('login')
                    //aqui pode ser feito o Redirecionamento para login caso acontessa um error
                }
            });
            if(response != null){
                this.users = response.data;
            }
        },
        async getOneUser(id: number){
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/usuarios/${id}`,
            {headers: {
                'Authorization': `Bearer ${this.token}`
            }}).catch(function (error) {
                const errorCode = error.response.data.statusCode;
                if (errorCode == 401){
                    router.push('login')
                    //aqui pode ser feito o Redirecionamento para login caso acontessa um error
                }
            });
            if(response != null){
                const user = response.data;
                return user;
            }
        },
        async createUser(user: UserCreate) {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/usuarios`, user);
            return response.data;
        },
        async updateUser(user: User) {
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/usuarios/${user.id}`,
                user, {headers: {
                    'Authorization': `Bearer ${this.token}`
                }}).catch(function (error) {
                    const errorCode = error.response.data.statusCode;
                    if (errorCode == 401){
                        router.push('login')
                        //aqui pode ser feito o Redirecionamento para login caso acontessa um error
                    }
                });
                if(response != null){
                    const user = response.data;
                    return user;
                }
        },
        async deleteUser(id: number) {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/usuario/${id}`,
            {headers: {
                'Authorization': `Bearer ${this.token}`
            }}
            );
        }
    }
})