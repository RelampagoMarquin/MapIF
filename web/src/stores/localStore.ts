import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("users", {
  state: () => {
    return {
      locais: [],
    };
  },
  getters: {},
  actions: {
    async getLocais() {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/locais`
      );
      this.locais = response.data;
    },
    async getOneLocal(id: number) {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/locais/${id}`
      );
      return response.data;
    },
    async createLocal(local: any) {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/locais`,
        local
      );
    },
  },
});
