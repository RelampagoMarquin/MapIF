import { defineStore } from 'pinia';
import { Polygon, PolygonCreate } from '../utils/types';
import axios from "axios";

export const usePolygonStore = defineStore('polygon', {
   state: () => {
    return {
        polygons: [],
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
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/poligonos`, {
                polygon
            })
        },
        async updatePolygon(polygon: Polygon) {
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/poligonos/${polygon.id}`, {
                polygon
            })

            return this.getOnePolygon(polygon.id);
        },
        async deletePolygon(id: number) {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/poligonos/${id}`)
        }
    }
})