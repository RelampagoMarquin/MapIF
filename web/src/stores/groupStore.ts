import { defineStore } from "pinia";
import { Group, GroupCreate } from "../utils/types";
import axios from "axios";
import router from "../router/index";

export const useGroupStore = defineStore("group", {
  state: () => {
    return {
      groups: [] as Group[],
      group: {} as Group,
      loading: 0,
      token: localStorage.getItem("token"),
    };
  },
  getters: {},
  actions: {
    addLoader() {
      this.loading++;
    },
    removeLoader() {
      this.loading--;
    },
    async getGroups() {
      this.addLoader();
      const response = await axios
        .get(`${import.meta.env.VITE_API_URL}/grupos`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .catch(function (error) {
          const errorCode = error.response.data.statusCode;
          if (errorCode == 401) {
            router.push("login");
            //aqui pode ser feito o Redirecionamento para login caso acontessa um error
          }
        });
      if (response != null) {
        this.groups = response.data;
        this.removeLoader();
      }
    },
    async getOneGroup(id: number) {
      this.addLoader();
      const response = await axios
        .get(`${import.meta.env.VITE_API_URL}/grupos/${id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .catch(function (error) {
          const errorCode = error.response.data.statusCode;
          if (errorCode == 401) {
            router.push("login");
            //aqui pode ser feito o Redirecionamento para login caso acontessa um error
          }
        });
      if (response != null) {
        this.group = response.data;
        this.removeLoader();
      }
    },
    async createGroup(group: GroupCreate) {
      const response = await axios
        .post(`${import.meta.env.VITE_API_URL}/grupos`, group, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .catch(function (error) {
          const errorCode = error.response.data.statusCode;
          if (errorCode == 401) {
            router.push("login");
            //aqui pode ser feito o Redirecionamento para login caso acontessa um error
          }
        });
      if (response != null) {
        return response.data;
      }
    },
    async updateGroup(group: Group) {
      const response = await axios
        .patch(`${import.meta.env.VITE_API_URL}/grupos/${group.id}`, group, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .catch(function (error) {
          const errorCode = error.response.data.statusCode;
          if (errorCode == 401) {
            router.push("login");
            //aqui pode ser feito o Redirecionamento para login caso acontessa um error
          }
        });
      if (response != null) {
        return response.data;
      }
    },
    async deleteGroup(id: number) {
      const response = await axios
        .delete(`${import.meta.env.VITE_API_URL}/grupos/${id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .catch(function (error) {
          const errorCode = error.response.data.statusCode;
          if (errorCode == 401) {
            router.push("login");
            //aqui pode ser feito o Redirecionamento para login caso acontessa um error
          }
        });
      if (response != null) {
        return response.data;
      }
    },
  },
});
