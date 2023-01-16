import { defineStore } from 'pinia';
import { Activity, ActivityCreate } from '../utils/types';
import axios from "axios";
import routes from "../router/index"

export const useActivityStore = defineStore('activity', {
   state: () => {
    return {
        Activitys: [],
        token: localStorage.getItem('token'),
    }
   },
    getters: {},
    actions: {
        async getActivitys() {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/atividades`);
                this.Activitys = response.data;
        },
        async getOneActivity(id: number){
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/atividades/${id}`);
                const activity = response.data;
                return activity;
        },
        async createActivity(activity: ActivityCreate) {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/atividades`, activity,
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
        },
        async updateActivity(activity: Activity) {
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/atividades/${activity.id}`,
                activity, {headers: {'Authorization': `Bearer ${this.token}`
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
        async deleteActivity(id: number) {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/atividades/${id}`,            {headers: {
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