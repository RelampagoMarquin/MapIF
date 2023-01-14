import { defineStore } from 'pinia';
import { Activity, ActivityCreate } from '../utils/types';
import axios from "axios";

export const useActivityStore = defineStore('activity', {
   state: () => {
    return {
        Activitys: [],
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
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/atividades`,
                activity)
        },
        async updateActivity(activity: Activity) {
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/atividades/${activity.id}`,
                activity)

            return this.getOneActivity(activity.id);
        },
        async deleteActivity(id: number) {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/atividades/${id}`)
        }
    }
})