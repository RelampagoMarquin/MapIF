import { defineStore } from 'pinia';
import { Polygon, PolygonCreate } from '../utils/types';
import axios from "axios";
import router from "../router/index"

export const usePolygonStore = defineStore('polygon', {
    state: () => {
        return {
            polygons: [],
            token: localStorage.getItem('token'),
        }
    },
    getters: {
        polygonsGetter: (state) => {
            console.log(state.polygons)
            return state.polygons
        }
    },
    actions: {
        async getPolygons(idEvent: number) {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/poligonos/evento/${idEvent}`, {
                headers: {
                  Authorization: `Bearer ${this.token}`,
                }
              });
             this.polygons = response.data
             return this.polygons
        },
        async getOnePolygon(id: number) {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/poligonos/${id}`, {
                headers: {
                  Authorization: `Bearer ${this.token}`,
                }
              });
            const polygon = response.data;
            return polygon;
        },
        async getPolygonsPublic(idEvent: number) {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/poligonos/evento/${idEvent}/public`);
             this.polygons = response.data
             return this.polygons
        },
        async getOnePolygonPublic(id: number) {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/poligonos/${id}/public`);
            const polygon = response.data;
            return polygon;
        },
        async createPolygon(polygon: PolygonCreate) {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/poligonos/evento/${polygon.eventoId}`, polygon.locais,
                {
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                }).catch(function (error) {
                    const errorCode = error.response.data.statusCode;
                    if (errorCode == 401) {
                        router.push('login')
                        //aqui pode ser feito o Redirecionamento para login caso acontessa um error
                    }
                });
            if (response != null) {
                return response.data;
            }
        },
        async updatePolygon(polygon: Polygon) {
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/poligonos/${polygon.id}`,
                polygon, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            }).catch(function (error) {
                const errorCode = error.response.data.statusCode;
                if (errorCode == 401) {
                    router.push('login')
                    //aqui pode ser feito o Redirecionamento para login caso acontessa um error
                }
            });
            if (response != null) {
                return response.data;
            }
        },
        async deletePolygon(id: number) {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/poligonos/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                }).catch(function (error) {
                    const errorCode = error.response.data.statusCode;
                    if (errorCode == 401) {
                        router.push('login')
                        //aqui pode ser feito o Redirecionamento para login caso acontessa um error
                    }
                });
            if (response != null) {
                return response.data;
            }
        }
    }
})