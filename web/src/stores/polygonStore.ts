import { defineStore } from 'pinia';
import { Polygon, PolygonCreate } from '../utils/types';
import axios from "axios";
import routes from "../router/index"

export const usePolygonStore = defineStore('polygon', {
   state: () => {
    return {
        polygons: [],
        token: localStorage.getItem('token'),
    }
   },
    getters: {},
    actions: {
        async getPolygons() {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/poligonos`);
            this.polygons = response.data;
        },
        async getOnePolygon(id: number){
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/poligonos/${id}`);
            const polygon = response.data;
            return polygon;
        },
        async createPolygon(polygon: PolygonCreate) {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/poligonos`, polygon,
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
        async updatePolygon(polygon: Polygon) {
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/poligonos/${polygon.id}`,
                polygon, {headers: {
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
        async deletePolygon(id: number) {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/poligonos/${id}`,
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