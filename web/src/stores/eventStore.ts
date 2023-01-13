import { defineStore } from 'pinia';
import { Event, EventCreate} from '../utils/types';
import axios from "axios";

export const useEventStore = defineStore('event', {
   state: () => {
    return {
        events: [],
    }
   },
    getters: {},
    actions: {
        async getEvents() {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/eventos`);
            this.events = response.data;
        },
        async getOneEvent(id: number){
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/eventos/${id}`);
            const event = response.data;
            return event;
        },
        async createEvent(event: EventCreate) {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/eventos`, {
                event
            })
        },
        async updateEvent(event: Event) {
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/eventos/${event.id}`, {
                event
            })

            return this.getOneEvent(event.id);
        },
        async deleteEvent(id: number) {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/eventos/${id}`)
        }
    }
})