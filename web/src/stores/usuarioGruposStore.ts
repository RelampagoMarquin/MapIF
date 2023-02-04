import { defineStore } from 'pinia';
import { UsuarioGrupo } from '../utils/types';
import axios from "axios";
import router from "../router/index"

export const useUsuarioGroupStore = defineStore('usuarioGroup', {
   state: () => {
    return {
        usuarioGroups: [],
        token: localStorage.getItem('token'),
    }
   },
    getters: {},
    actions: {
        async getUsuarioGroups() {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/usuariogrupos`, {headers: {
                'Authorization': `Bearer ${this.token}`
            }}).catch(function (error) {
                const errorCode = error.response.data.statusCode;
                if (errorCode == 401){
                    router.push('login')
                    //aqui pode ser feito o Redirecionamento para login caso acontessa um error
                }
            });
            if(response != null){
                this.usuarioGroups = response.data;
            }
        },
        async getOneUsuarioGroup(usuarioId: number, grupoId: number){
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/usuariogrupos/${usuarioId}/${grupoId}`, {headers: {
                'Authorization': `Bearer ${this.token}`
            }}).catch(function (error) {
                const errorCode = error.response.data.statusCode;
                if (errorCode == 401){
                    router.push('login')
                    //aqui pode ser feito o Redirecionamento para login caso acontessa um error
                }
            });
            if(response != null){
                const usuarioGroup = response.data;
                return usuarioGroup;
            }
        },
        async createUsuarioGroup(groupuser: UsuarioGrupo) {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/usuariogrupos`, groupuser, {headers: {
                'Authorization': `Bearer ${this.token}`
            }}).catch(function (error) {
                const errorCode = error.response.data.statusCode;
                if (errorCode == 401){
                    router.push('login')
                    //aqui pode ser feito o Redirecionamento para login caso acontessa um error
                }
            });
            if(response != null){
                return response.data;
            }
        },
        async updateUsuarioGroup(groupuser: UsuarioGrupo) {
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/usuariogrupos/${groupuser.usuarioId}/${groupuser.grupoId}`,
                groupuser, {headers: {
                    'Authorization': `Bearer ${this.token}`
                }}).catch(function (error) {
                    const errorCode = error.response.data.statusCode;
                    if (errorCode == 401){
                        router.push('login')
                        //aqui pode ser feito o Redirecionamento para login caso acontessa um error
                    }
                });
                if(response != null){
                    return response.data;
                }
        },
        async deleteUsuarioGroup(usuarioId: number, grupoId: number) {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/usuariogrupos/${usuarioId}/${grupoId}`, 
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
                return response.data;
            }
        }
    }
})