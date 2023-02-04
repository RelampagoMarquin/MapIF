import { defineStore } from "pinia";
import { ActivityCreate } from "../utils/types";
import axios from "axios";
import routes from "../router/index";

export const useActivityStore = defineStore("activity", {
  state: () => {
    return {
      activitys: [],
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
    async getActivitys(id: number) {
      this.addLoader();
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/atividades/poligono/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      this.activitys = response.data;
      this.removeLoader();
    },
    async getOneActivity(id: number) {
      this.addLoader();
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/atividades/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      const activity = response.data;
      this.removeLoader();
      return activity;
    },
    async getActivitysByEvent(id: number) {
      this.addLoader();
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/atividades/evento/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      this.activitys = response.data;
      this.removeLoader();
    },
    async createActivity(activity: ActivityCreate) {
      const response = await axios
        .post(
          `${import.meta.env.VITE_API_URL}/atividades/poligono/${
            activity.poligonoId
          }`,
          activity,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .catch(function (error) {
          const errorCode = error.response.data.statusCode;
          if (errorCode == 401) {
            routes.push("login");
            //aqui pode ser feito o Redirecionamento para login caso acontessa um error
          }
        });
      if (response != null) {
        return response.data;
      }
    },
    async updateActivity(activity: any) {
      const response = await axios
        .patch(
          `${import.meta.env.VITE_API_URL}/atividades/${activity.id}`,
          activity,
          { headers: { Authorization: `Bearer ${this.token}` } }
        )
        .catch(function (error) {
          const errorCode = error.response.data.statusCode;
          if (errorCode == 401) {
            routes.push("login");
            //aqui pode ser feito o Redirecionamento para login caso acontessa um error
          }
        });
      if (response != null) {
        return response.data;
      }
    },
    async deleteActivity(id: number) {
      const response = await axios
        .delete(`${import.meta.env.VITE_API_URL}/atividades/${id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .catch(function (error) {
          const errorCode = error.response.data.statusCode;
          if (errorCode == 401) {
            routes.push("login");
            //aqui pode ser feito o Redirecionamento para login caso acontessa um error
          }
        });
      if (response != null) {
        return response.data;
      }
    },
  },
});
