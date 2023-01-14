import { defineStore } from 'pinia';
import { Group, GroupCreate } from '../utils/types';
import axios from "axios";

export const useGroupStore = defineStore('group', {
   state: () => {
    return {
        groups: [],
    }
   },
    getters: {},
    actions: {
        async getGroups() {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/grupos`);
            this.groups = response.data;
        },
        async getOneGroup(id: number){
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/grupos/${id}`);
            const group = response.data;
            return group;
        },
        async createGroup(group: GroupCreate) {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/grupos`, group)
        },
        async updateGroup(group: Group) {
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/grupos/${group.id}`,
                group)

            return this.getOneGroup(group.id);
        },
        async deleteGroup(id: number) {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/grupos/${id}`)
        }
    }
})