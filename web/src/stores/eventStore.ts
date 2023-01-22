import { defineStore } from 'pinia';
import { Event, EventCreate } from '../utils/types';
import axios from "axios";
import routes from "../router/index"

export const useEventStore = defineStore('event', {
    state: () => {
        return {
            events: [],
            token: localStorage.getItem('token'),
        }
    },
    getters: {},
    actions: {
        async getEvents() {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/eventos`);
            console.log(response)
            this.events = response.data;
        },
        async getOneEvent(id: number) {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/eventos/${id}`);
            const event = response.data;
            return event;
        },
        async createEvent(event: EventCreate) {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/eventos`, event,
                {
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                }).catch(function (error) {
                    const errorCode = error.response.data.statusCode;
                    if (errorCode == 401) {
                        routes.push('login')
                        //aqui pode ser feito o Redirecionamento para login caso acontessa um error
                    }
                });
            if (response != null) {
                return response.data;
            }
        },
        async updateEvent(event: Event) {
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/eventos/${event.id}`,
                event, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
            }).catch(function (error) {
                const errorCode = error.response.data.statusCode;
                if (errorCode == 401) {
                    routes.push('login')
                    //aqui pode ser feito o Redirecionamento para login caso acontessa um error
                }
            });
            if (response != null) {
                return response.data;
            }
        },
        async deleteEvent(id: number) {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/eventos/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                }).catch(function (error) {
                    const errorCode = error.response.data.statusCode;
                    if (errorCode == 401) {
                        routes.push('login')
                        //aqui pode ser feito o Redirecionamento para login caso acontessa um error
                    }
                });
            if (response != null) {
                return response.data;
            }
        }
    }
})