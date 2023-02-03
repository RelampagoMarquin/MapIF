import { defineStore } from 'pinia';
import { Event, EventCreate } from '../utils/types';
import axios from "axios";
import routes from "../router/index"

export const useEventStore = defineStore('event', {
    state: () => {
        return {
            events: [],
            loading: 0,
            token: localStorage.getItem('token'),
        }
    },
    getters: {},
    actions: {
        addLoader(){
            this.loading++;
        },
        removeLoader(){
            this.loading--;
        }
        ,
        async getEvents() {
            this.addLoader();
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/eventos`,  {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });         
            this.events = response.data;
            this.removeLoader();
        },
        async getOneEvent(id: number) {
            this.addLoader();
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/eventos/${id}`);
            const event = response.data;
            this.removeLoader();
            return event;
        },
        async createEvent(event: EventCreate) {
            this.addLoader();
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
            this.removeLoader();
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