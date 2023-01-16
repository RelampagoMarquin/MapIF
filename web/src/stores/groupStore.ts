import { defineStore } from 'pinia';
import { Group, GroupCreate } from '../utils/types';
import axios from "axios";
import routes from "../router/index"

export const useGroupStore = defineStore('group', {
   state: () => {
    return {
        groups: [],
        token: localStorage.getItem('token'),
    }
   },
    getters: {},
    actions: {
        async getGroups() {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/grupos`, {headers: {
                'Authorization': `Bearer ${this.token}`
            }}).catch(function (error) {
                const errorCode = error.response.data.statusCode;
                if (errorCode == 401){
                    routes.push('login')
                    //aqui pode ser feito o Redirecionamento para login caso acontessa um error
                }
            });
            if(response != null){
                this.groups = response.data;
            }
        },
        async getOneGroup(id: number){
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/grupos/${id}`, {headers: {
                'Authorization': `Bearer ${this.token}`
            }}).catch(function (error) {
                const errorCode = error.response.data.statusCode;
                if (errorCode == 401){
                    routes.push('login')
                    //aqui pode ser feito o Redirecionamento para login caso acontessa um error
                }
            });
            if(response != null){
                const group = response.data;
                return group;
            }
        },
        async createGroup(group: GroupCreate) {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/grupos`, group, {headers: {
                'Authorization': `Bearer ${this.token}`
            }}).catch(function (error) {
                const errorCode = error.response.data.statusCode;
                if (errorCode == 401){
                    routes.push('login')
                    //aqui pode ser feito o Redirecionamento para login caso acontessa um error
                }
            });
            if(response != null){
                return response.data;
            }
        },
        async updateGroup(group: Group) {
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/grupos/${group.id}`,
                group, {headers: {
                    'Authorization': `Bearer ${this.token}`
                }}).catch(function (error) {
                    const errorCode = error.response.data.statusCode;
                    if (errorCode == 401){
                        routes.push('login')
                        //aqui pode ser feito o Redirecionamento para login caso acontessa um error
                    }
                });
                if(response != null){
                    return response.data;
                }
        },
        async deleteGroup(id: number) {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/grupos/${id}`, 
            {headers: {
                'Authorization': `Bearer ${this.token}`
            }}).catch(function (error) {
                const errorCode = error.response.data.statusCode;
                if (errorCode == 401){
                    routes.push('login')
                    //aqui pode ser feito o Redirecionamento para login caso acontessa um error
                }
            });
            if(response != null){
                return response.data;
            }
        }
    }
})